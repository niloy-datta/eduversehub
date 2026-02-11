import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { randomBytes, createHash } from 'crypto';
import prisma from '../lib/prisma';
import { hashPassword, comparePassword, generateToken } from '../lib/auth';
import { authenticate } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rateLimit.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';
import { sendPasswordResetEmail } from '../lib/email';

const router = Router();

const userPublicSelect = {
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
  lastLogin: true,
  totalPoints: true,
  awardedBadges: true,
  isPremium: true,
  premiumUntil: true,
  createdAt: true,
};


/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    {string} email - User's email address.
 * @body    {string} name - User's full name.
 * @body    {string} password - User's desired password (min 6 characters).
 */
router.post(
  '/register',
  authLimiter,
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    try {
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
        select: userPublicSelect,
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
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and return a JWT
 * @access  Public
 * @body    {string} email - User's email address.
 * @body    {string} password - User's password.
 */
router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    try {
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

      // Update last login and fetch public user data in one go
      // Also, calculate daily streak
      const now = new Date();
      const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

      const lastLogin = user.lastLogin;
      let newStreak = user.streakDays;

      if (lastLogin) {
        const lastLoginUTC = new Date(Date.UTC(lastLogin.getUTCFullYear(), lastLogin.getUTCMonth(), lastLogin.getUTCDate()));
        const diffTime = todayUTC.getTime() - lastLoginUTC.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          // Continued streak
          newStreak++;
        } else if (diffDays > 1) {
          // Streak broken
          newStreak = 1;
        }
        // If diffDays is 0 or less than 1, they already logged in today, do nothing to the streak.
      } else {
        newStreak = 1; // First login
      }

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: now, streakDays: newStreak },
        select: userPublicSelect,
      });

      // Generate token
      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: updatedUser,
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
 * @route   GET /api/auth/me
 * @desc    Get the profile of the currently authenticated user
 * @access  Private
 */
router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: userPublicSelect,
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
 * @route   PUT /api/auth/profile
 * @desc    Update the profile of the currently authenticated user
 * @access  Private
 * @body    {string} [name] - New name for the user.
 * @body    {string} [bio] - New bio for the user.
 * @body    {string} [languagePreference] - New language preference (e.g., 'en', 'bn').
 * @body    {string} [avatarUrl] - New URL for the user's avatar.
 */
router.put(
  '/profile',
  authenticate,
  [
    body('name').optional().trim().isLength({ min: 2 }),
    body('bio').optional().trim(),
    body('languagePreference').optional().isIn(['en', 'bn']),
    body('avatarUrl').optional({ checkFalsy: true }).isURL().withMessage('Avatar URL must be a valid URL'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, bio, languagePreference, avatarUrl } = req.body;

      const user = await prisma.user.update({
        where: { id: req.user!.userId },
        data: {
          ...(name && { name }),
          ...(bio !== undefined && { bio }),
          ...(languagePreference && { languagePreference }),
          ...(avatarUrl !== undefined && { avatarUrl }),
        },
        select: userPublicSelect,
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

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change the password for the currently authenticated user
 * @access  Private
 * @body    {string} currentPassword - The user's current password.
 * @body    {string} newPassword - The desired new password (min 6 characters).
 */
router.put(
  '/change-password',
  authenticate,
  authLimiter,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters')
      .custom((value, { req }) => {
        if (value === req.body.currentPassword) {
          throw new Error('New password cannot be the same as the current password');
        }
        return true;
      }),
  ],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user!.userId;

      // Get user with password hash
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      // This case is unlikely if `authenticate` middleware is working correctly
      if (!user) {
        res.status(404).json({ status: 'error', message: 'User not found' });
        return;
      }

      // 1. Verify current password
      const isPasswordValid = await comparePassword(currentPassword, user.passwordHash);
      if (!isPasswordValid) {
        res.status(403).json({ status: 'error', message: 'Incorrect current password' });
        return;
      }

      // 2. Hash the new password
      const newPasswordHash = await hashPassword(newPassword);

      // 3. Update the password in the database
      await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash },
      });

      res.status(200).json({
        status: 'success',
        message: 'Password changed successfully',
      });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ status: 'error', message: 'Failed to change password' });
    }
  }
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Initiate the password reset process for a user
 * @access  Public
 * @body    {string} email - The email address of the account to reset.
 */
router.post(
  '/forgot-password',
  authLimiter,
  [body('email').isEmail().withMessage('Please enter a valid email address')],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        // 1. Generate a random token
        const resetToken = randomBytes(32).toString('hex');

        // 2. Hash the token and set an expiry date (e.g., 10 minutes)
        const passwordResetToken = createHash('sha256').update(resetToken).digest('hex');
        const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

        await prisma.user.update({
          where: { email },
          data: { passwordResetToken, passwordResetExpires },
        });

        // 3. Send the email (with the unhashed token)
        try {
          await sendPasswordResetEmail(user.email, resetToken);
        } catch (emailError) {
          console.error('Failed to send password reset email:', emailError);
          // Don't expose email sending failure to the client
        }
      }

      // Always return a generic success message to prevent user enumeration
      res.status(200).json({
        status: 'success',
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ status: 'error', message: 'An internal error occurred' });
    }
  }
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset a user's password using a valid reset token
 * @access  Public
 * @body    {string} token - The password reset token sent to the user's email.
 * @body    {string} newPassword - The desired new password (min 6 characters).
 */
router.post(
  '/reset-password',
  authLimiter,
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword } = req.body;

      // 1. Hash the incoming token to match the one in the DB
      const hashedToken = createHash('sha256').update(token).digest('hex');

      // 2. Find the user by the hashed token and check if it's not expired
      const user = await prisma.user.findFirst({
        where: {
          passwordResetToken: hashedToken,
          passwordResetExpires: { gt: new Date() },
        },
      });

      if (!user) {
        res.status(400).json({ status: 'error', message: 'Token is invalid or has expired' });
        return;
      }

      // 3. Hash the new password
      const newPasswordHash = await hashPassword(newPassword);

      // 4. Update the user's password and invalidate the reset token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash: newPasswordHash,
          passwordResetToken: null, // Invalidate the token
          passwordResetExpires: null,
        },
      });

      // Optionally, you could log the user in here by generating a new JWT

      res.status(200).json({
        status: 'success',
        message: 'Password has been reset successfully.',
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ status: 'error', message: 'Failed to reset password' });
    }
  }
);

export default router;
