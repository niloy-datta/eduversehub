import { Router, Request, Response } from 'express';
import { authenticate, optionalAuthenticate } from '../middleware/auth.middleware';
import { query, body, param } from 'express-validator';
import prisma from '../lib/prisma';
import { handleValidationErrors } from '../middleware/validation.middleware';
import { checkAndAwardBadges } from '../lib/badges';

const router = Router();

router.get(
  '/',
  [
    query('category').optional().isString(),
    query('difficulty').optional().isString(),
    query('language').optional().isString(),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
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

router.get(
  '/:slug',
  optionalAuthenticate,
  [param('slug').isString().notEmpty().withMessage('Slug must be a valid string')],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      const lesson = await prisma.lesson.findUnique({
        where: { slug: req.params.slug as string },
        include: {
          // Only include progress for the currently authenticated user
          progress: userId
            ? {
                where: {
                  userId: userId,
                },
              }
            : false,
        },
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
  }
);

router.post(
  '/:id/progress',
  authenticate,
  [
    param('id').isUUID().withMessage('Invalid lesson ID'),
    body('status').optional().isString(),
    body('progressPercentage').optional().isInt({ min: 0, max: 100 }).toInt(),
    body('timeSpent').optional().isInt({ min: 0 }).toInt(),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const { id } = req.params;
    const { status, progressPercentage, timeSpent } = req.body;

    try {
      const { progress } = await prisma.$transaction(async (tx) => {
        const existingProgress = await tx.lessonProgress.findUnique({
          where: { userId_lessonId: { userId, lessonId: id as string } },
        });

        const wasCompleted = existingProgress?.status === 'completed';

        const progress = await tx.lessonProgress.upsert({
          where: { userId_lessonId: { userId, lessonId: id as string } },
          update: {
            ...(status && { status }),
            ...(progressPercentage !== undefined && { progressPercentage }),
            ...(timeSpent !== undefined && { timeSpent: { increment: timeSpent } }),
            lastAccessed: new Date(),
            ...(status === 'completed' && !wasCompleted && { completedAt: new Date() }),
          },
          create: {
            userId,
            lessonId: id as string,
            status: status || 'in_progress',
            progressPercentage: progressPercentage ?? 0,
            timeSpent: timeSpent ?? 0,
            startedAt: new Date(),
            ...(status === 'completed' && { completedAt: new Date() }),
          },
          include: { lesson: true },
        });

        // Award points for completing the lesson for the first time
        if (status === 'completed' && !wasCompleted) {
          const pointsForLesson = progress.lesson.pointsAwarded ?? 50; // Default to 50 points
          await tx.user.update({
            where: { id: userId },
            data: { totalPoints: { increment: pointsForLesson } },
          });

          // Check for new badges after completing a lesson
          await checkAndAwardBadges(userId, tx);
        }

        return { progress };
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
