import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

const todayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
};

router.get('/daily', authenticate, async (_req: Request, res: Response): Promise<void> => {
  try {
    const { start, end } = todayRange();
    const challenge = await prisma.dailyChallenge.findFirst({
      where: { date: { gte: start, lt: end } },
      orderBy: { date: 'desc' },
    });

    if (!challenge) {
      res.status(404).json({ status: 'error', message: 'No challenge for today' });
      return;
    }

    res.status(200).json({ status: 'success', data: { challenge } });
  } catch (error) {
    console.error('Get daily challenge error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch daily challenge' });
  }
});

router.post(
  '/:id/attempt',
  authenticate,
  [
    body('completed').optional().isBoolean().toBoolean(),
    body('score').optional().isFloat({ min: 0 }),
    body('timeTaken').optional().isInt({ min: 1 }).toInt(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const userId = req.user!.userId;
    const { id } = req.params;
    const { completed = false, score, timeTaken } = req.body;

    try {
      const challenge = await prisma.dailyChallenge.findUnique({ where: { id } });
      if (!challenge) {
        res.status(404).json({ status: 'error', message: 'Challenge not found' });
        return;
      }

      const attempt = await prisma.challengeAttempt.upsert({
        where: { userId_challengeId: { userId, challengeId: id } },
        update: { completed, score: score ?? null, timeTaken: timeTaken ?? null },
        create: {
          userId,
          challengeId: id,
          completed,
          score: score ?? null,
          timeTaken: timeTaken ?? null,
        },
      });

      await prisma.dailyChallenge.update({
        where: { id },
        data: {
          participantsCount: { increment: 1 },
          ...(completed && { completionCount: { increment: 1 } }),
        },
      });

      res.status(201).json({
        status: 'success',
        message: 'Challenge attempt saved',
        data: { attempt },
      });
    } catch (error) {
      console.error('Submit challenge attempt error', error);
      res.status(500).json({ status: 'error', message: 'Failed to submit attempt' });
    }
  }
);

router.get('/history', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const attempts = await prisma.challengeAttempt.findMany({
      where: { userId },
      include: { challenge: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ status: 'success', data: { attempts } });
  } catch (error) {
    console.error('Get challenge history error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch history' });
  }
});

export default router;
