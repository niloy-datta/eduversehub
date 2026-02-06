import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { query, body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

router.get(
  '/',
  [
    query('category').optional().isString(),
    query('difficulty').optional().isString(),
    query('language').optional().isString(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const { category, difficulty, language } = req.query as Record<string, string | undefined>;

    try {
      const lessons = await prisma.lesson.findMany({
        where: {
          ...(category && { category }),
          ...(difficulty && { difficulty }),
          ...(language && { language }),
        },
        orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          category: true,
          difficulty: true,
          estimatedTime: true,
          isPremium: true,
          keywords: true,
          orderIndex: true,
        },
      });

      res.status(200).json({ status: 'success', data: { lessons } });
    } catch (error) {
      console.error('List lessons error', error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch lessons' });
    }
  }
);

router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { slug: req.params.slug },
      include: { progress: true },
    });

    if (!lesson) {
      res.status(404).json({ status: 'error', message: 'Lesson not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: { lesson } });
  } catch (error) {
    console.error('Get lesson error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch lesson' });
  }
});

router.post(
  '/:id/progress',
  authenticate,
  [
    body('status').optional().isString(),
    body('progressPercentage').optional().isInt({ min: 0, max: 100 }).toInt(),
    body('timeSpent').optional().isInt({ min: 0 }).toInt(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const userId = req.user!.userId;
    const { id } = req.params;
    const { status, progressPercentage, timeSpent } = req.body;

    try {
      const progress = await prisma.lessonProgress.upsert({
        where: { userId_lessonId: { userId, lessonId: id } },
        update: {
          ...(status && { status }),
          ...(progressPercentage !== undefined && { progressPercentage }),
          ...(timeSpent !== undefined && { timeSpent: { increment: timeSpent } }),
          lastAccessed: new Date(),
          ...(status === 'completed' && { completedAt: new Date() }),
        },
        create: {
          userId,
          lessonId: id,
          status: status || 'in_progress',
          progressPercentage: progressPercentage ?? 0,
          timeSpent: timeSpent ?? 0,
          startedAt: new Date(),
          ...(status === 'completed' && { completedAt: new Date() }),
        },
        include: { lesson: true },
      });

      res.status(200).json({
        status: 'success',
        message: 'Progress updated',
        data: { progress },
      });
    } catch (error) {
      console.error('Update lesson progress error', error);
      res.status(500).json({ status: 'error', message: 'Failed to update progress' });
    }
  }
);

router.get('/my-progress', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const items = await prisma.lessonProgress.findMany({
      where: { userId },
      include: { lesson: true },
      orderBy: { lastAccessed: 'desc' },
    });

    res.status(200).json({ status: 'success', data: { progress: items } });
  } catch (error) {
    console.error('Get my progress error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch progress' });
  }
});

export default router;
