import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import { hashPassword, comparePassword, generateToken } from '../lib/auth';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: 'error',
          errors: errors.array(),
        });
        return;
      }

      const { email, name, password } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(409).json({
          status: 'error',
          message: 'User with this email already exists',
        });
        return;
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
        },
        select: {
          id: true,
          email: true,
          name: true,
          typingLevel: true,
          wpmBest: true,
          accuracyAvg: true,
          streakDays: true,
          totalPoints: true,
          createdAt: true,
        },
      });

      // Generate token
      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to register user',
      });
    }
  }
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: 'error',
          errors: errors.array(),
        });
        return;
      }

      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid email or password',
        });
        return;
      }

      // Verify password
      const isPasswordValid = await comparePassword(password, user.passwordHash);

      if (!isPasswordValid) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid email or password',
        });
        return;
      }

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      // Generate token
      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      // Return user data (excluding password hash)
      const { passwordHash, ...userData } = user;

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: userData,
          token,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to login',
      });
    }
  }
);

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        bio: true,
        languagePreference: true,
        typingLevel: true,
        wpmBest: true,
        accuracyAvg: true,
        totalTypingTime: true,
        streakDays: true,
        lastActivityDate: true,
        totalPoints: true,
        badges: true,
        isPremium: true,
        premiumUntil: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get user profile',
    });
  }
});

/**
 * PUT /api/auth/profile
 * Update user profile
 */
router.put(
  '/profile',
  authenticate,
  [
    body('name').optional().trim().isLength({ min: 2 }),
    body('bio').optional().trim(),
    body('languagePreference').optional().isIn(['en', 'bn']),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: 'error',
          errors: errors.array(),
        });
        return;
      }

      const { name, bio, languagePreference, avatarUrl } = req.body;

      const user = await prisma.user.update({
        where: { id: req.user!.userId },
        data: {
          ...(name && { name }),
          ...(bio !== undefined && { bio }),
          ...(languagePreference && { languagePreference }),
          ...(avatarUrl && { avatarUrl }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatarUrl: true,
          bio: true,
          languagePreference: true,
        },
      });

      res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: { user },
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update profile',
      });
    }
  }
);

export default router;
