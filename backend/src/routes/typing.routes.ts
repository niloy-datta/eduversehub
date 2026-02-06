import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * POST /api/typing/results
 * Save a typing test result
 */
router.post('/results', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { wpm, accuracy, duration, characters, mode, language } = req.body;

    // Validate required fields
    if (wpm === undefined || accuracy === undefined || duration === undefined) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required fields: wpm, accuracy, duration',
      });
      return;
    }

    // Create typing result
    const result = await prisma.typingResult.create({
      data: {
        userId: req.user!.userId,
        wpm: Math.round(wpm),
        accuracy: parseFloat(accuracy.toFixed(2)),
        duration: Math.round(duration),
        characters: characters || 0,
        mode: mode || 'time-60',
        language: language || 'en',
      },
    });

    // Update user stats
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (user) {
      const allResults = await prisma.typingResult.findMany({
        where: { userId: req.user!.userId },
        orderBy: { wpm: 'desc' },
        take: 100,
      });

      const avgAccuracy = allResults.reduce((sum: number, r: any) => sum + r.accuracy, 0) / allResults.length;
      const bestWpm = allResults[0]?.wpm || wpm;
      const totalTime = allResults.reduce((sum: number, r: any) => sum + r.duration, 0);

      await prisma.user.update({
        where: { id: req.user!.userId },
        data: {
          wpmBest: Math.max(user.wpmBest, bestWpm),
          accuracyAvg: parseFloat(avgAccuracy.toFixed(2)),
          totalTypingTime: totalTime,
          lastActivityDate: new Date(),
          totalPoints: user.totalPoints + Math.round(wpm * accuracy / 100),
        },
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'Result saved successfully',
      data: { result },
    });
  } catch (error) {
    console.error('Save result error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to save typing result',
    });
  }
});

/**
 * GET /api/typing/results
 * Get user's typing history
 */
router.get('/results', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = parseInt(req.query.offset as string) || 0;

    const results = await prisma.typingResult.findMany({
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
    });

    const total = await prisma.typingResult.count({
      where: { userId: req.user!.userId },
    });

    res.status(200).json({
      status: 'success',
      data: { results, total, limit, offset },
    });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get typing results',
    });
  }
});

/**
 * GET /api/typing/statistics
 * Get user's typing statistics
 */
router.get('/statistics', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    // Get all results for calculations
    const allResults = await prisma.typingResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (allResults.length === 0) {
      res.status(200).json({
        status: 'success',
        data: {
          totalTests: 0,
          avgWpm: 0,
          avgAccuracy: 0,
          bestWpm: 0,
          totalTime: 0,
          weeklyProgress: [],
          recentTests: [],
        },
      });
      return;
    }

    // Calculate stats
    const totalTests = allResults.length;
    const avgWpm = Math.round(allResults.reduce((sum: number, r: any) => sum + r.wpm, 0) / totalTests);
    const avgAccuracy = parseFloat((allResults.reduce((sum: number, r: any) => sum + r.accuracy, 0) / totalTests).toFixed(1));
    const bestWpm = Math.max(...allResults.map((r: any) => r.wpm));
    const totalTime = allResults.reduce((sum: number, r: any) => sum + r.duration, 0);

    // Weekly progress (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyResults = allResults.filter((r: any) => new Date(r.createdAt) >= weekAgo);
    const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      const dayResults = weeklyResults.filter((r: any) => {
        const created = new Date(r.createdAt);
        return created >= dayStart && created <= dayEnd;
      });
      
      return dayResults.length > 0 
        ? Math.round(dayResults.reduce((sum: number, r: any) => sum + r.wpm, 0) / dayResults.length)
        : 0;
    });

    // Recent tests
    const recentTests = allResults.slice(0, 10).map((r: any) => ({
      id: r.id,
      wpm: r.wpm,
      accuracy: r.accuracy,
      mode: r.mode,
      createdAt: r.createdAt,
    }));

    res.status(200).json({
      status: 'success',
      data: {
        totalTests,
        avgWpm,
        avgAccuracy,
        bestWpm,
        totalTime,
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
