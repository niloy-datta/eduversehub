# 🗄️ Database Schema - EduVerse Hub

## Overview

PostgreSQL database with Prisma ORM for type-safe database access.

## Core Tables

### 1. Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,

  -- OAuth
  google_id VARCHAR(255) UNIQUE,

  -- Profile
  avatar_url TEXT,
  bio TEXT,
  language_preference VARCHAR(10) DEFAULT 'en',

  -- Typing Stats
  typing_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced, pro
  wpm_best INTEGER DEFAULT 0,
  accuracy_avg DECIMAL(5,2) DEFAULT 0,
  total_typing_time INTEGER DEFAULT 0, -- in seconds

  -- Gamification
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE,
  total_points INTEGER DEFAULT 0,
  badges JSONB DEFAULT '[]',

  -- Subscription
  is_premium BOOLEAN DEFAULT false,
  premium_until TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,

  INDEX idx_email (email),
  INDEX idx_google_id (google_id),
  INDEX idx_typing_level (typing_level)
);
```

### 2. Typing Tests Table

```sql
CREATE TABLE typing_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Test Configuration
  test_type VARCHAR(50) NOT NULL, -- 'beginner', 'intermediate', 'advanced', 'custom'
  language VARCHAR(10) DEFAULT 'en', -- 'en', 'bn'
  text_content TEXT NOT NULL,
  word_count INTEGER NOT NULL,

  -- Results
  wpm DECIMAL(6,2) NOT NULL,
  raw_wpm DECIMAL(6,2) NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  errors INTEGER DEFAULT 0,
  time_taken INTEGER NOT NULL, -- in seconds

  -- Error Analysis
  error_heatmap JSONB, -- { "a": 5, "s": 3, ... }
  missed_words TEXT[],

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  INDEX idx_wpm (wpm)
);
```

### 3. Code Typing Tests Table

```sql
CREATE TABLE code_typing_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Code Configuration
  language VARCHAR(20) NOT NULL, -- 'c', 'cpp', 'python', 'java', 'javascript'
  difficulty VARCHAR(20) DEFAULT 'beginner',
  code_snippet TEXT NOT NULL,
  code_length INTEGER NOT NULL,

  -- Results
  wpm DECIMAL(6,2) NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  syntax_errors INTEGER DEFAULT 0,
  completion_time INTEGER NOT NULL, -- in seconds

  -- Code-specific Metrics
  indentation_accuracy DECIMAL(5,2),
  bracket_matching_score DECIMAL(5,2),

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_user_id (user_id),
  INDEX idx_language (language),
  INDEX idx_difficulty (difficulty)
);
```

### 4. Lessons Table

```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL, -- Markdown content

  -- Organization
  category VARCHAR(50) NOT NULL, -- 'programming', 'typing', 'career'
  language VARCHAR(20), -- 'c', 'python', 'javascript', etc.
  difficulty VARCHAR(20) DEFAULT 'beginner',
  estimated_time INTEGER, -- in minutes
  order_index INTEGER DEFAULT 0,

  -- Unlock Requirements
  unlock_requirement JSONB, -- { "typing_level": "intermediate", "points": 100 }
  is_premium BOOLEAN DEFAULT false,

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT[],

  -- Engagement
  views_count INTEGER DEFAULT 0,
  completion_count INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_slug (slug),
  INDEX idx_category (category),
  INDEX idx_difficulty (difficulty)
);
```

### 5. Lesson Progress Table

```sql
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,

  -- Progress
  status VARCHAR(20) DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  progress_percentage INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- in seconds

  -- Metadata
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  last_accessed TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, lesson_id),
  INDEX idx_user_id (user_id),
  INDEX idx_lesson_id (lesson_id)
);
```

### 6. Quizzes Table

```sql
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,

  -- Organization
  category VARCHAR(50) NOT NULL, -- 'ssc', 'hsc', 'bsc', 'programming', 'aptitude'
  subject VARCHAR(100), -- 'math', 'physics', 'c_programming', etc.
  difficulty VARCHAR(20) DEFAULT 'medium',

  -- Configuration
  questions JSONB NOT NULL, -- Array of question objects
  total_questions INTEGER NOT NULL,
  time_limit INTEGER, -- in minutes
  passing_score INTEGER DEFAULT 60,

  -- Access
  is_premium BOOLEAN DEFAULT false,
  unlock_requirement JSONB,

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Engagement
  attempts_count INTEGER DEFAULT 0,
  avg_score DECIMAL(5,2),

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_slug (slug),
  INDEX idx_category (category),
  INDEX idx_subject (subject)
);
```

### 7. Quiz Attempts Table

```sql
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,

  -- Results
  score DECIMAL(5,2) NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken INTEGER NOT NULL, -- in seconds

  -- Details
  answers JSONB NOT NULL, -- User's answers with correctness
  passed BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_user_id (user_id),
  INDEX idx_quiz_id (quiz_id),
  INDEX idx_created_at (created_at)
);
```

### 8. Certificates Table

```sql
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Certificate Details
  type VARCHAR(50) NOT NULL, -- 'typing_master', 'code_typing_pro', 'course_completion'
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Achievement Data
  achievement_data JSONB, -- { "wpm": 80, "accuracy": 98, "course": "Python Basics" }

  -- File
  certificate_url TEXT,
  share_token VARCHAR(100) UNIQUE,

  -- Metadata
  issue_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_user_id (user_id),
  INDEX idx_share_token (share_token),
  INDEX idx_type (type)
);
```

### 9. Daily Challenges Table

```sql
CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Challenge Details
  date DATE UNIQUE NOT NULL,
  challenge_type VARCHAR(50) NOT NULL, -- 'typing', 'code_typing', 'quiz'
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Content
  content JSONB NOT NULL, -- Challenge-specific data
  difficulty VARCHAR(20) DEFAULT 'medium',

  -- Rewards
  reward_points INTEGER DEFAULT 10,

  -- Stats
  participants_count INTEGER DEFAULT 0,
  completion_count INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_date (date),
  INDEX idx_challenge_type (challenge_type)
);
```

### 10. Challenge Attempts Table

```sql
CREATE TABLE challenge_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES daily_challenges(id) ON DELETE CASCADE,

  -- Results
  completed BOOLEAN DEFAULT false,
  score DECIMAL(6,2),
  time_taken INTEGER,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, challenge_id),
  INDEX idx_user_id (user_id),
  INDEX idx_challenge_id (challenge_id)
);
```

### 11. Leaderboards Table

```sql
CREATE TABLE leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Leaderboard Type
  type VARCHAR(50) NOT NULL, -- 'typing_wpm', 'code_typing', 'quiz_master', 'streak'
  period VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly', 'all_time'

  -- Score
  score DECIMAL(10,2) NOT NULL,
  rank INTEGER,

  -- Metadata
  period_start DATE,
  period_end DATE,
  updated_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_type_period (type, period),
  INDEX idx_user_id (user_id),
  INDEX idx_rank (rank)
);
```

### 12. SEO Pages Table

```sql
CREATE TABLE seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Page Details
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  meta_description TEXT,
  keywords TEXT[],

  -- Content
  content TEXT, -- Markdown or HTML
  template_type VARCHAR(50), -- 'typing_test', 'code_typing', 'quiz', 'lesson'

  -- Configuration
  config JSONB, -- Page-specific configuration

  -- SEO
  canonical_url TEXT,
  og_image TEXT,

  -- Analytics
  views_count INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2),
  avg_time_on_page INTEGER,

  -- Status
  is_published BOOLEAN DEFAULT true,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_slug (slug),
  INDEX idx_template_type (template_type)
);
```

### 13. Analytics Events Table

```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Event Details
  event_type VARCHAR(100) NOT NULL, -- 'page_view', 'test_start', 'test_complete', 'ad_view'
  event_data JSONB,

  -- Session
  session_id VARCHAR(100),

  -- Context
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_user_id (user_id),
  INDEX idx_event_type (event_type),
  INDEX idx_created_at (created_at),
  INDEX idx_session_id (session_id)
);
```

## Prisma Schema

See `prisma/schema.prisma` for the complete Prisma schema definition.

## Indexes Strategy

### High-Priority Indexes

- User email, google_id (authentication)
- Typing tests by user_id and created_at (user history)
- Lessons by slug, category (content discovery)
- Quizzes by slug, category (content discovery)
- Leaderboards by type and period (rankings)

### Composite Indexes

- `(user_id, created_at)` on typing_tests for user history queries
- `(type, period, rank)` on leaderboards for efficient ranking
- `(category, difficulty)` on lessons and quizzes for filtering

## Data Retention

- **Analytics Events**: 90 days rolling window
- **Typing Tests**: Keep all (for progress tracking)
- **Quiz Attempts**: Keep all (for analytics)
- **Sessions**: 30 days

## Backup Strategy

- Daily automated backups
- Point-in-time recovery enabled
- Backup retention: 30 days

## Performance Considerations

1. **Connection Pooling**: Use Prisma connection pooling
2. **Caching**: Redis for frequently accessed data (leaderboards, user stats)
3. **Partitioning**: Consider partitioning analytics_events by date
4. **Materialized Views**: For complex leaderboard calculations

## Security

1. **Row-Level Security**: Implement where supported
2. **Encrypted Fields**: Password hashes, sensitive user data
3. **Audit Logging**: Track all data modifications
4. **Rate Limiting**: Prevent abuse at database level
