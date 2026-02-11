import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { param, query } from 'express-validator';
import prisma from '../lib/prisma';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

/**
 * Updates the leaderboard table with the latest user rankings.
 * In a real application, this should be a background job (e.g., cron).
 */
async function updateLeaderboard(type: 'points' | 'wpm', period: 'all-time' | 'weekly') {
  // For now, we only implement all-time points
  if (type !== 'points' || period !== 'all-time') {
    console.warn(`Leaderboard update for ${type}/${period} not implemented.`);
    return;
  }

  const users = await prisma.user.findMany({
    orderBy: {
      totalPoints: 'desc',
    },
    take: 200, // Get top 200 users
    select: {
      id: true,
      totalPoints: true,
    },
  });

  const leaderboardEntries = users.map((user, index) => ({
    userId: user.id,
    type,
    period,
    rank: index + 1,
    score: user.totalPoints,
  }));

  // Use a transaction to clear the old leaderboard and insert the new one
  await prisma.$transaction([
    prisma.leaderboard.deleteMany({ where: { type, period } }),
    prisma.leaderboard.createMany({
      data: leaderboardEntries,
    }),
  ]);

  console.log(`Leaderboard updated for ${type}/${period} with ${leaderboardEntries.length} entries.`);
}

// This is an internal-only endpoint to trigger the update manually.
// In production, you would remove this and use a scheduled task.
router.post('/__internal__/update', async (_req, res) => {
  // NOTE: Add security here in a real app (e.g., check for a secret key)
  await updateLeaderboard('points', 'all-time');
  res.status(200).send('Leaderboard update triggered.');
});

router.get(
  '/my-rank',
  authenticate,
  [
    query('type').isString().notEmpty().withMessage('Query `type` is required'),
    query('period').isString().notEmpty().withMessage('Query `period` is required'),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const { type, period } = req.query as { type: string; period: string };

    // For now, only 'points' is supported for dynamic ranking
    if (type !== 'points' || period !== 'all-time') {
      res.status(400).json({ status: 'error', message: 'This leaderboard type does not support dynamic ranking yet.' });
      return;
    }

    try {
      const userId = req.user!.userId;
      let entry = await prisma.leaderboard.findFirst({
        where: { type, period, userId: req.user!.userId },
      });

      // If user is not in the top 200, calculate their rank dynamically
      if (!entry) {
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { totalPoints: true } });
        if (!user) {
          res.status(404).json({ status: 'error', message: 'User not found' });
          return;
        }
        // Count how many users have more points
        const rank = await prisma.user.count({
          where: { totalPoints: { gt: user.totalPoints } },
        });
        entry = { id: '', userId, type, period, rank: rank + 1, score: user.totalPoints, createdAt: new Date(), updatedAt: new Date(), periodStart: null, periodEnd: null };
      }

      res.status(200).json({ status: 'success', data: { rank: entry } });
    } catch (error) {
      console.error('Get my rank error', error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch rank' });
    }
  }
);

router.get(
  '/:type/:period',
  [
    param('type').isString().notEmpty().withMessage('Param `type` is required'),
    param('period').isString().notEmpty().withMessage('Param `period` is required'),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const { type, period } = req.params as { type: string; period: string };
    try {
      const items = await prisma.leaderboard.findMany({
        where: { type, period },
        orderBy: [
        { rank: 'asc' },
        { score: 'desc' },
        { updatedAt: 'desc' },
      ],
      take: 100,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            typingLevel: true,
          },
        },
      },
    });
      res.status(200).json({ status: 'success', data: { leaderboard: items } });
    } catch (error) {
      console.error('Get leaderboard error', error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch leaderboard' });
    }
  }
);

export default router;
