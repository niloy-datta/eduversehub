import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import typingRoutes from './routes/typing.routes';
import codeTypingRoutes from './routes/code-typing.routes';
import lessonRoutes from './routes/lesson.routes';
import quizRoutes from './routes/quiz.routes';
import certificateRoutes from './routes/certificate.routes';
import challengeRoutes from './routes/challenge.routes';
import leaderboardRoutes from './routes/leaderboard.routes';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:9899',
  'http://localhost:6787',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    // and requests from allowed origins.
    if (!origin || allowedOrigins.includes(origin as string)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'EduVerse Hub API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/typing', typingRoutes);
app.use('/api/code-typing', codeTypingRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});

export default app;
