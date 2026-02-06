import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';

const router = Router();

router.get('/my-rank', authenticate, async (req: Request, res: Response): Promise<void> => {
  const { type, period } = req.query as { type?: string; period?: string };
  if (!type || !period) {
    res.status(400).json({ status: 'error', message: 'type and period are required' });
    return;
  }

  try {
    const entry = await prisma.leaderboard.findFirst({
      where: { type, period, userId: req.user!.userId },
    });

    if (!entry) {
      res.status(404).json({ status: 'error', message: 'Rank not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: { rank: entry } });
  } catch (error) {
    console.error('Get my rank error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch rank' });
  }
});

router.get('/:type/:period', async (req: Request, res: Response): Promise<void> => {
  const { type, period } = req.params;
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
});

export default router;
