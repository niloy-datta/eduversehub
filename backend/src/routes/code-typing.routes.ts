import { Router, Request, Response } from 'express';
import { body, query } from 'express-validator';
import prisma from '../lib/prisma';
import { authenticate, optionalAuthenticate } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';
import { checkAndAwardBadges } from '../lib/badges';

const router = Router();

router.post(
  '/test',
  authenticate,
  [
    body('language').isString().notEmpty(),
    body('difficulty').optional().isString(),
    body('codeSnippet').isString().notEmpty(),
    body('codeLength').optional().isInt({ min: 1 }).toInt(),
    body('wpm').isFloat({ min: 0 }),
    body('accuracy').isFloat({ min: 0, max: 100 }),
    body('syntaxErrors').optional().isInt({ min: 0 }).toInt(),
    body('completionTime').isInt({ min: 1 }).toInt(),
    body('indentationAccuracy').optional().isFloat({ min: 0, max: 100 }),
    body('bracketMatchingScore').optional().isFloat({ min: 0, max: 100 }),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const {
      language,
      difficulty = 'beginner',
      codeSnippet,
      codeLength = codeSnippet.length,
      wpm,
      accuracy,
      syntaxErrors = 0,
      completionTime,
      indentationAccuracy,
      bracketMatchingScore,
    } = req.body;

    try {
      const record = await prisma.$transaction(async (tx) => {
        const newTest = await tx.codeTypingTest.create({
          data: {
            userId,
            language,
            difficulty,
            codeSnippet,
            codeLength,
            wpm,
            accuracy,
            syntaxErrors,
            completionTime,
            indentationAccuracy,
            bracketMatchingScore,
          },
        });

        // Update user's total points and last activity date
        // Points calculation can be refined later
        const points = Math.round(wpm * (accuracy / 100) * 1.2); // Code typing might be worth more

        // Recalculate user's aggregate stats
        const recentCodeTests = await tx.codeTypingTest.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 100,
          select: { wpm: true, accuracy: true },
        });

        const allTests = [...recentCodeTests, { wpm, accuracy }];
        const newAvgWpm = allTests.reduce((sum, r) => sum + r.wpm, 0) / allTests.length;
        const newAvgAccuracy = allTests.reduce((sum, r) => sum + r.accuracy, 0) / allTests.length;
        const newBestWpm = Math.max(...allTests.map((r) => r.wpm), (await tx.user.findUnique({ where: { id: userId }, select: { wpmBest: true } }))?.wpmBest ?? 0);

        await tx.user.update({
          where: { id: userId },
          data: {
            totalPoints: { increment: points },
            lastActivityDate: new Date(),
            totalTypingTime: { increment: completionTime },
            wpmBest: newBestWpm,
            wpmAvg: parseFloat(newAvgWpm.toFixed(2)),
            accuracyAvg: parseFloat(newAvgAccuracy.toFixed(2)),
          },
        });

        // Check for new badges after the test
        await checkAndAwardBadges(userId, tx);

        return newTest;
      });

      res.status(201).json({
        status: 'success',
        message: 'Code typing test submitted',
        data: { test: record },
      });
    } catch (error) {
      console.error('Code typing submit error', error);
      res.status(500).json({ status: 'error', message: 'Failed to submit code typing test' });
    }
  }
);

router.get(
  '/history',
  authenticate,
  [
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('offset').optional().isInt({ min: 0 }).toInt(),
  ],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const limit = (req.query.limit as number | undefined) ?? 20;
    const offset = (req.query.offset as number | undefined) ?? 0;

    try {
      const [tests, total] = await prisma.$transaction([
        prisma.codeTypingTest.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
          select: {
            id: true,
            language: true,
            difficulty: true,
            wpm: true,
            accuracy: true,
            syntaxErrors: true,
            completionTime: true,
            createdAt: true,
          },
        }),
        prisma.codeTypingTest.count({ where: { userId } }),
      ]);

      res.status(200).json({
        status: 'success',
        data: { tests, pagination: { total, limit, offset } },
      });
    } catch (error) {
      console.error('Code typing history error', error);
      res.status(500).json({ status: 'error', message: 'Failed to get history' });
    }
  }
);

router.get('/stats', authenticate, async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  try {
    const stats = await prisma.codeTypingTest.aggregate({
      where: { userId },
      _avg: { wpm: true, accuracy: true },
      _sum: { completionTime: true },
      _count: { _all: true },
    });

    const byLanguage = await prisma.codeTypingTest.groupBy({
      by: ['language'],
      _avg: { wpm: true, accuracy: true },
      _count: { language: true },
      where: { userId },
    });

    const recent = await prisma.codeTypingTest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { language: true, wpm: true, accuracy: true, createdAt: true },
    });

    res.status(200).json({
      status: 'success',
      data: {
        totalTests: stats._count._all,
        overall: {
          avgWpm: stats._avg.wpm ?? 0,
          avgAccuracy: stats._avg.accuracy ?? 0,
          totalTime: stats._sum.completionTime ?? 0,
        },
        byLanguage,
        recent,
      },
    });
  } catch (error) {
    console.error('Code typing stats error', error);
    res.status(500).json({ status: 'error', message: 'Failed to get stats' });
  }
});

router.get(
  '/snippets',
  optionalAuthenticate,
  [query('language').optional().isString()],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    const { language = 'javascript' } = req.query as { language?: string };
    const lower = language.toLowerCase();

    // For now, return hardcoded snippets since CodeSnippet model doesn't exist
    const hardcodedSnippets = {
      javascript: [
        'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
        'const fetchData = async (url) => {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n};',
        'const debounce = (fn, delay) => {\n  let timeoutId;\n  return (...args) => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn(...args), delay);\n  };\n};'
      ],
      python: [
        'def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)',
        'class BinaryTree:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n    \n    def insert(self, value):\n        if value < self.value:\n            if self.left is None:\n                self.left = BinaryTree(value)\n            else:\n                self.left.insert(value)'
      ],
      java: [
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
        'public int factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}'
      ]
    };

    const snippets = hardcodedSnippets[lower as keyof typeof hardcodedSnippets] || hardcodedSnippets.javascript;

    res.status(200).json({
      status: 'success',
      data: { language: lower, snippets }
    });
  }
);

export default router;
