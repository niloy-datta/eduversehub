import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { body, param, query } from 'express-validator';
import prisma from '../lib/prisma';
import { handleValidationErrors } from '../middleware/validation.middleware';

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
    param('id').isUUID().withMessage('Invalid challenge ID'),
    body('completed').optional().isBoolean().toBoolean(),
    body('score').optional().isFloat({ min: 0 }),
    body('timeTaken').optional().isInt({ min: 1 }).toInt(),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const { id } = req.params;
    const challengeId = id as string;
    const { completed = false, score, timeTaken } = req.body;

    try {
      const { attempt } = await prisma.$transaction(async (tx) => {
        const challenge = await tx.dailyChallenge.findUnique({ where: { id: challengeId } });
        if (!challenge) {
          throw new Error('Challenge not found');
        }

        const existingAttempt = await tx.challengeAttempt.findUnique({
          where: { userId_challengeId: { userId, challengeId } },
        });

        const attempt = await tx.challengeAttempt.upsert({
          where: { userId_challengeId: { userId, challengeId } },
          update: { completed, score: score ?? null, timeTaken: timeTaken ?? null },
          create: {
            userId,
            challengeId,
            completed,
            score: score ?? null,
            timeTaken: timeTaken ?? null,
          },
        });

        // Update participant/completion counts
        const isFirstAttempt = !existingAttempt;
        const isNewCompletion = completed && (!existingAttempt || !existingAttempt.completed);

        if (isFirstAttempt || isNewCompletion) {
          await tx.dailyChallenge.update({
            where: { id: challengeId },
            data: {
              ...(isFirstAttempt && { participantsCount: { increment: 1 } }),
              ...(isNewCompletion && { completionCount: { increment: 1 } }),
            },
          });
        }

        return { attempt };
      });

      res.status(201).json({
        status: 'success',
        message: 'Challenge attempt saved',
        data: { attempt },
      });
    } catch (error) {
      console.error('Submit challenge attempt error', error);
      if (error instanceof Error && error.message === 'Challenge not found') {
        res.status(404).json({ status: 'error', message: 'Challenge not found' });
        return;
      }
      res.status(500).json({ status: 'error', message: 'Failed to submit attempt' });
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
    try {
      const userId = req.user!.userId;
      const limit = (req.query.limit as number | undefined) ?? 20;
      const offset = (req.query.offset as number | undefined) ?? 0;

      const [attempts, total] = await prisma.$transaction([
        prisma.challengeAttempt.findMany({
          where: { userId },
          include: { challenge: true },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        }),
        prisma.challengeAttempt.count({ where: { userId } }),
      ]);

      res.status(200).json({ status: 'success', data: { attempts, pagination: { total, limit, offset } } });
  } catch (error) {
    console.error('Get challenge history error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch history' });
  }
});

export default router;
