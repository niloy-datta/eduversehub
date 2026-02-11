import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { body, param } from 'express-validator';
import prisma from '../lib/prisma';
import { handleValidationErrors } from '../middleware/validation.middleware';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const certificates = await prisma.certificate.findMany({
      where: { userId },
      orderBy: { issueDate: 'desc' },
    });

    res.status(200).json({ status: 'success', data: { certificates } });
  } catch (error) {
    console.error('Get certificates error', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch certificates' });
  }
});

router.post(
  '/generate',
  authenticate,
  [
    body('type').isString().notEmpty(),
    body('title').isString().notEmpty(),
    body('description').optional().isString(),
    body('achievementData').optional(),
  ],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const { type, title, description, achievementData } = req.body;

    try {
      const shareToken = uuidv4();
      const certificate = await prisma.certificate.create({
        data: {
          userId,
          type,
          title,
          description,
          achievementData: achievementData || {},
          shareToken,
          certificateUrl: null,
        },
      });

      res.status(201).json({
        status: 'success',
        message: 'Certificate generated',
        data: { certificate },
      });
    } catch (error) {
      console.error('Generate certificate error', error);
      res.status(500).json({ status: 'error', message: 'Failed to generate certificate' });
    }
  }
);

router.get(
  '/:shareToken',
  [param('shareToken').isUUID().withMessage('Invalid share token')],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    try {
      const certificate = await prisma.certificate.findUnique({ where: { shareToken: req.params.shareToken as string } });
      if (!certificate) {
        res.status(404).json({ status: 'error', message: 'Certificate not found' });
        return;
      }

      res.status(200).json({ status: 'success', data: { certificate } });
    } catch (error) {
      console.error('Get certificate by token error', error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch certificate' });
    }
  }
);

router.get(
  '/:id/download',
  authenticate,
  [param('id').isUUID().withMessage('Invalid certificate ID')],
  handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const certificate = await prisma.certificate.findFirst({
        where: { id: req.params.id as string, userId },
      });

      // If not found for this user, it's either not theirs or doesn't exist
      if (!certificate) {
        res.status(404).json({ status: 'error', message: 'Certificate not found' });
        return;
      }

      // Placeholder: In real implementation, serve a file. For now return metadata.
      res.status(200).json({
        status: 'success',
        data: {
          certificate,
          downloadUrl: certificate.certificateUrl || null,
        },
      });
    } catch (error) {
      console.error('Download certificate error', error);
      res.status(500).json({ status: 'error', message: 'Failed to download certificate' });
    }
  }
);

export default router;
