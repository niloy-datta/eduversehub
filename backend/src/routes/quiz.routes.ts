import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { query, body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

router.get(
  '/',
  [
    query('category').optional().isString(),
    query('subject').optional().isString(),
    query('difficulty').optional().isString(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const { category, subject, difficulty } = req.query as Record<string, string | undefined>;

    try {
      const quizzes = await prisma.quiz.findMany({
        where: {
          ...(category && { category }),
          ...(subject && { subject }),
          ...(difficulty && { difficulty }),
        },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          category: true,
          subject: true,
          difficulty: true,
          totalQuestions: true,
          timeLimit: true,
          passingScore: true,
          isPremium: true,
          attemptsCount: true,
        },
      });

      res.status(200).json({ status: 'success', data: { quizzes } });
    } catch (error) {
      console.error('List quizzes error', error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch quizzes' });
    }
  }
);

router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const quiz = await prisma.quiz.findUnique({ where: { slug: req.params.slug } });
    if (!quiz) {
      res.status(404).json({ status: 'error', message: 'Quiz not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: { quiz } });
  } catch (error) {
    console.error('Get quiz error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch quiz' });
  }
});

router.post(
  '/:id/attempt',
  authenticate,
  [
    body('score').isFloat({ min: 0 }),
    body('correctAnswers').isInt({ min: 0 }).toInt(),
    body('totalQuestions').isInt({ min: 1 }).toInt(),
    body('timeTaken').isInt({ min: 1 }).toInt(),
    body('answers').optional().isArray(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const userId = req.user!.userId;
    const { id } = req.params;
    const { score, correctAnswers, totalQuestions, timeTaken, answers = [] } = req.body;

    try {
      const quiz = await prisma.quiz.findUnique({ where: { id } });
      if (!quiz) {
        res.status(404).json({ status: 'error', message: 'Quiz not found' });
        return;
      }

      const passed = score >= quiz.passingScore;

      const attempt = await prisma.quizAttempt.create({
        data: {
          userId,
          quizId: id,
          score,
          correctAnswers,
          totalQuestions,
          timeTaken,
          answers,
          passed,
        },
      });

      await prisma.quiz.update({
        where: { id },
        data: {
          attemptsCount: { increment: 1 },
          avgScore: {
            set: ((quiz.avgScore ?? 0) * quiz.attemptsCount + score) / (quiz.attemptsCount + 1),
          },
        },
      });

      res.status(201).json({
        status: 'success',
        message: 'Quiz attempt submitted',
        data: { attempt },
      });
    } catch (error) {
      console.error('Submit quiz attempt error', error);
      res.status(500).json({ status: 'error', message: 'Failed to submit attempt' });
    }
  }
);

router.get('/my-attempts', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const attempts = await prisma.quizAttempt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { quiz: true },
    });

    res.status(200).json({ status: 'success', data: { attempts } });
  } catch (error) {
    console.error('Get my attempts error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch attempts' });
  }
});

router.get('/:id/results/:attemptId', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, attemptId } = req.params;
    const attempt = await prisma.quizAttempt.findFirst({
      where: { id: attemptId, quizId: id, userId: req.user!.userId },
      include: { quiz: true },
    });

    if (!attempt) {
      res.status(404).json({ status: 'error', message: 'Result not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: { attempt } });
  } catch (error) {
    console.error('Get quiz result error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch result' });
  }
});

export default router;
