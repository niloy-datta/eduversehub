import { Router, Request, Response } from 'express';
import { body, query } from 'express-validator';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

/**
 * POST /api/typing/results
 * Save a typing test result
 */
router.post(
  '/results',
  authenticate,
  [
    body('wpm').isFloat({ min: 0 }).withMessage('WPM must be a non-negative number'),
    body('accuracy').isFloat({ min: 0, max: 100 }).withMessage('Accuracy must be between 0 and 100'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
    body('characters').optional().isInt({ min: 0 }).toInt(),
    body('mode').optional().isString(),
    body('language').optional().isString(),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    try {
      const { wpm, accuracy, duration, characters, mode, language } = req.body;
      const userId = req.user!.userId;

      const result = await prisma.typingTest.create({
        data: {
          userId,
          wpm: Math.round(wpm),
          accuracy: parseFloat(accuracy.toFixed(2)),
          duration,
          characters: characters ?? 0,
          mode: mode ?? 'time-60',
          language: language || 'en',
        },
      });

      res.status(201).json({ status: 'success', message: 'Result saved successfully', data: { result } });
    } catch (error) {
      console.error('Save result error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to save typing result',
      });
    }
  }
);

/**
 * GET /api/typing/results
 * Get user's typing history
 */
router.get(
  '/results',
  authenticate,
  [
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('offset').optional().isInt({ min: 0 }).toInt(),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const limit = (req.query.limit as number | undefined) ?? 20;
    const offset = (req.query.offset as number | undefined) ?? 0;

    try {
      const [results, total] = await prisma.$transaction([
        prisma.typingTest.findMany({
          where: { userId: req.user!.userId },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
          select: {
            id: true,
            wpm: true,
            accuracy: true,
            duration: true,
            characters: true,
            mode: true,
            language: true,
            createdAt: true,
          },
        }),
        prisma.typingTest.count({ where: { userId: req.user!.userId } }),
      ]);

      res.status(200).json({
        status: 'success',
        data: { results, pagination: { total, limit, offset } },
      });
    } catch (error) {
      console.error('Get results error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to get typing results',
      });
    }
  }
);

/**
 * GET /api/typing/statistics
 * Get user's typing statistics
 */
router.get('/statistics', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const [user, recentTests] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { id: userId },
        select: { wpmAvg: true, accuracyAvg: true, wpmBest: true, totalTypingTime: true },
      }),
      prisma.typingTest.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 15,
      }),
    ]);

    if (!user || recentTests.length === 0) {
      res.status(200).json({
        status: 'success',
        data: {
          totalTests: 0,
          avgWpm: 0,
          avgAccuracy: 0,
          bestWpm: 0,
          totalTime: 0,
          weeklyProgress: Array(7).fill(0),
          recentTests: [],
        },
      });
      return;
    }

    const totalTests = await prisma.typingTest.count({
      where: { userId },
    });

    // Weekly progress (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyResults = await prisma.typingTest.findMany({
      where: { userId, createdAt: { gte: weekAgo } },
      select: { wpm: true, createdAt: true },
    });

    const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - i));
      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const dayResults = weeklyResults.filter((r: { createdAt: Date; wpm: number }) => {
        const created = new Date(r.createdAt); // r.createdAt is already a Date object but this ensures it
        return created >= dayStart && created <= dayEnd;
      });

      return dayResults.length > 0
        ? Math.round(dayResults.reduce((sum, r) => sum + r.wpm, 0) / dayResults.length)
        : 0;
    });

    res.status(200).json({
      status: 'success',
      data: {
        totalTests,
        avgWpm: Math.round(user.wpmAvg ?? 0),
        avgAccuracy: user.accuracyAvg ?? 0,
        bestWpm: user.wpmBest ?? 0,
        totalTime: user.totalTypingTime ?? 0,
        weeklyProgress,
        recentTests,
      },
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get statistics',
    });
  }
});

export default router;
