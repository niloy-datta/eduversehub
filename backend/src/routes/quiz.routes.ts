import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { query, body, param } from 'express-validator';
import prisma from '../lib/prisma';
import { handleValidationErrors } from '../middleware/validation.middleware';
import { badgeTypes, checkAndAwardBadges } from '../lib/badges';

const router = Router();

router.get(
  '/',
  [
    query('category').optional().isString(),
    query('subject').optional().isString(),
    query('difficulty').optional().isString(),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
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

router.get(
  '/:slug',
  [param('slug').isString().notEmpty().withMessage('Slug must be a valid string')],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    try {
      const quiz = await prisma.quiz.findUnique({ where: { slug: req.params.slug as string } });
      if (!quiz) {
        res.status(404).json({ status: 'error', message: 'Quiz not found' });
        return;
      }

      res.status(200).json({ status: 'success', data: { quiz } });
    } catch (error) {
      console.error('Get quiz error', error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch quiz' });
    }
  }
);

router.post(
  '/:id/attempt',
  authenticate,
  [
    param('id').isUUID().withMessage('Invalid quiz ID'),
    body('score').isFloat({ min: 0 }),
    body('correctAnswers').isInt({ min: 0 }).toInt(),
    body('totalQuestions').isInt({ min: 1 }).toInt(),
    body('timeTaken').isInt({ min: 1 }).toInt(),
    body('answers').optional().isArray(),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const { id } = req.params as { id: string };
    const { score, correctAnswers, totalQuestions, timeTaken, answers = [] } = req.body;

    try {
      const attempt = await prisma.$transaction(async (tx) => {
        const quiz = await tx.quiz.findUnique({ where: { id } });
        if (!quiz) {
          throw new Error('Quiz not found');
        }

        const existingAttempt = await tx.quizAttempt.findFirst({
          where: { userId, quizId: id },
        });

        const attempt = await tx.quizAttempt.create({
          data: {
          userId,
          quizId: id,
          score,
          correctAnswers,
          totalQuestions,
          timeTaken,
          answers,
            passed: score >= quiz.passingScore,
          },
        });

        // Only update global quiz stats on the user's first attempt
        if (!existingAttempt) {
          // Atomically update attemptsCount and avgScore to prevent race conditions
          await tx.$executeRaw`UPDATE "Quiz" SET "attemptsCount" = "attemptsCount" + 1, "avgScore" = (("avgScore" * "attemptsCount") + ${score}) / ("attemptsCount" + 1) WHERE id = ${id}`;
        }

        // Award points for the attempt
        const points = Math.round(score * 1.5); // e.g., 1.5 points per score point
        await tx.user.update({
          where: { id: userId },
          data: { totalPoints: { increment: points } },
        });

        // Check for Quiz Master badge specifically
        if (score === 100) {
          const quizMasterBadge = await tx.badge.findUnique({ where: { name: badgeTypes.QUIZ_MASTER.name } });
          if (quizMasterBadge) {
            await tx.user.update({
              where: { id: userId },
              data: { awardedBadges: { connect: { id: quizMasterBadge.id } } },
            });
          }
        }

        // Check for other potential badges
        await checkAndAwardBadges(userId, tx);

        return attempt;
      });

      res.status(201).json({
        status: 'success',
        message: 'Quiz attempt submitted',
        data: { attempt },
      });
    } catch (error) {
      console.error('Submit quiz attempt error', error);
      if (error instanceof Error && error.message === 'Quiz not found') {
        res.status(404).json({ status: 'error', message: 'Quiz not found' });
        return;
      }
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

router.get(
  '/:id/results/:attemptId',
  authenticate,
  [
    param('id').isUUID().withMessage('Invalid quiz ID'),
    param('attemptId').isUUID().withMessage('Invalid attempt ID'),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, attemptId } = req.params as { id: string; attemptId: string };
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
  }
);

export default router;
