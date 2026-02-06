import { Router, Request, Response } from 'express';
import { body, validationResult, query } from 'express-validator';
import prisma from '../lib/prisma';
import { authenticate, optionalAuthenticate } from '../middleware/auth.middleware';

const router = Router();

const sampleSnippets: Record<string, string[]> = {
  javascript: [
    `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    `const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};`,
  ],
  python: [
    `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)`,
  ],
  java: [
    `public static int binarySearch(int[] arr, int target) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        if (arr[m] < target) l = m + 1; else r = m - 1;
    }
    return -1;
}`,
  ],
  c: [
    `int sum(int *arr, int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return s;
}`,
  ],
  cpp: [
    `template<typename T>
T maxVal(T a, T b) {
    return a > b ? a : b;
}`,
  ],
};

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
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

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
      const record = await prisma.codeTypingTest.create({
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
  [query('limit').optional().isInt({ min: 1, max: 100 }).toInt(), query('offset').optional().isInt({ min: 0 }).toInt()],
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const limit = (req.query.limit as number | undefined) ?? 20;
    const offset = (req.query.offset as number | undefined) ?? 0;

    try {
      const tests = await prisma.codeTypingTest.findMany({
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
      });

      const total = await prisma.codeTypingTest.count({ where: { userId } });

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

router.get(
  '/stats',
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    try {
      const totalTests = await prisma.codeTypingTest.count({ where: { userId } });
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
        data: { totalTests, byLanguage, recent },
      });
    } catch (error) {
      console.error('Code typing stats error', error);
      res.status(500).json({ status: 'error', message: 'Failed to get stats' });
    }
  }
);

router.get(
  '/snippets',
  optionalAuthenticate,
  [query('language').optional().isString()],
  async (req: Request, res: Response): Promise<void> => {
    const { language = 'javascript' } = req.query as { language?: string };
    const lower = language.toLowerCase();
    const snippets = sampleSnippets[lower] || sampleSnippets.javascript;

    res.status(200).json({
      status: 'success',
      data: { language: lower, snippets },
    });
  }
);

export default router;
