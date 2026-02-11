-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "password_reset_token" TEXT,
    "password_reset_expires" DATETIME,
    "google_id" TEXT,
    "avatar_url" TEXT,
    "bio" TEXT,
    "language_preference" TEXT NOT NULL DEFAULT 'en',
    "typing_level" TEXT NOT NULL DEFAULT 'beginner',
    "wpm_best" INTEGER NOT NULL DEFAULT 0,
    "wpm_avg" REAL NOT NULL DEFAULT 0,
    "accuracy_avg" REAL NOT NULL DEFAULT 0,
    "total_typing_time" INTEGER NOT NULL DEFAULT 0,
    "streak_days" INTEGER NOT NULL DEFAULT 0,
    "last_activity_date" DATETIME,
    "total_points" INTEGER NOT NULL DEFAULT 0,
    "badges" JSONB NOT NULL DEFAULT [],
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "premium_until" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "last_login" DATETIME
);

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "typing_tests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'time-60',
    "language" TEXT NOT NULL DEFAULT 'en',
    "text_content" TEXT,
    "word_count" INTEGER,
    "wpm" REAL NOT NULL,
    "raw_wpm" REAL,
    "accuracy" REAL NOT NULL,
    "errors" INTEGER NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL,
    "characters" INTEGER NOT NULL DEFAULT 0,
    "time_taken" INTEGER,
    "error_heatmap" JSONB,
    "missed_words" JSONB,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "typing_tests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "code_typing_tests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'beginner',
    "code_snippet" TEXT NOT NULL,
    "code_length" INTEGER NOT NULL,
    "wpm" REAL NOT NULL,
    "accuracy" REAL NOT NULL,
    "syntax_errors" INTEGER NOT NULL DEFAULT 0,
    "completion_time" INTEGER NOT NULL,
    "indentation_accuracy" REAL,
    "bracket_matching_score" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "code_typing_tests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL DEFAULT '',
    "practice_code" TEXT,
    "category" TEXT NOT NULL,
    "language" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'beginner',
    "estimated_time" INTEGER,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "points_awarded" INTEGER NOT NULL DEFAULT 50,
    "prev_lesson_id" TEXT,
    "next_lesson_id" TEXT,
    "unlock_requirement" JSONB,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "keywords" JSONB,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "completion_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "lessons_prev_lesson_id_fkey" FOREIGN KEY ("prev_lesson_id") REFERENCES "lessons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lesson_progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not_started',
    "progress_percentage" INTEGER NOT NULL DEFAULT 0,
    "time_spent" INTEGER NOT NULL DEFAULT 0,
    "started_at" DATETIME,
    "completed_at" DATETIME,
    "last_accessed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lesson_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "lesson_progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lesson_sections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lesson_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    CONSTRAINT "lesson_sections_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lesson_id" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "subject" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "total_questions" INTEGER NOT NULL,
    "time_limit" INTEGER,
    "passing_score" INTEGER NOT NULL DEFAULT 60,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "unlock_requirement" JSONB,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "attempts_count" INTEGER NOT NULL DEFAULT 0,
    "avg_score" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "quizzes_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quiz_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "question_type" TEXT NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "image_thumb" TEXT,
    "explanation" TEXT,
    CONSTRAINT "questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "quiz_attempts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "correct_answers" INTEGER NOT NULL,
    "total_questions" INTEGER NOT NULL,
    "time_taken" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "quiz_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "quiz_attempts_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "achievement_data" JSONB,
    "certificate_url" TEXT,
    "share_token" TEXT,
    "issue_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "daily_challenges" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "challenge_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" JSONB NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "reward_points" INTEGER NOT NULL DEFAULT 10,
    "participants_count" INTEGER NOT NULL DEFAULT 0,
    "completion_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "challenge_attempts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "score" REAL,
    "time_taken" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "challenge_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "challenge_attempts_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "daily_challenges" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "leaderboards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "rank" INTEGER,
    "period_start" DATETIME,
    "period_end" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "leaderboards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "seo_pages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "meta_description" TEXT,
    "keywords" JSONB,
    "content" TEXT,
    "template_type" TEXT,
    "config" JSONB,
    "canonical_url" TEXT,
    "og_image" TEXT,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "bounce_rate" REAL,
    "avg_time_on_page" INTEGER,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "event_type" TEXT NOT NULL,
    "event_data" JSONB,
    "session_id" TEXT,
    "page_url" TEXT,
    "referrer" TEXT,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "analytics_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserBadges" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserBadges_A_fkey" FOREIGN KEY ("A") REFERENCES "badges" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserBadges_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_google_id_idx" ON "users"("google_id");

-- CreateIndex
CREATE INDEX "users_typing_level_idx" ON "users"("typing_level");

-- CreateIndex
CREATE UNIQUE INDEX "badges_name_key" ON "badges"("name");

-- CreateIndex
CREATE INDEX "typing_tests_user_id_idx" ON "typing_tests"("user_id");

-- CreateIndex
CREATE INDEX "typing_tests_created_at_idx" ON "typing_tests"("created_at");

-- CreateIndex
CREATE INDEX "typing_tests_wpm_idx" ON "typing_tests"("wpm");

-- CreateIndex
CREATE INDEX "code_typing_tests_user_id_idx" ON "code_typing_tests"("user_id");

-- CreateIndex
CREATE INDEX "code_typing_tests_language_idx" ON "code_typing_tests"("language");

-- CreateIndex
CREATE INDEX "code_typing_tests_difficulty_idx" ON "code_typing_tests"("difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_slug_key" ON "lessons"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_prev_lesson_id_key" ON "lessons"("prev_lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_next_lesson_id_key" ON "lessons"("next_lesson_id");

-- CreateIndex
CREATE INDEX "lessons_slug_idx" ON "lessons"("slug");

-- CreateIndex
CREATE INDEX "lessons_category_idx" ON "lessons"("category");

-- CreateIndex
CREATE INDEX "lessons_difficulty_idx" ON "lessons"("difficulty");

-- CreateIndex
CREATE INDEX "lesson_progress_user_id_idx" ON "lesson_progress"("user_id");

-- CreateIndex
CREATE INDEX "lesson_progress_lesson_id_idx" ON "lesson_progress"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_progress_user_id_lesson_id_key" ON "lesson_progress"("user_id", "lesson_id");

-- CreateIndex
CREATE INDEX "lesson_sections_lesson_id_idx" ON "lesson_sections"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_lesson_id_key" ON "quizzes"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_slug_key" ON "quizzes"("slug");

-- CreateIndex
CREATE INDEX "quizzes_slug_idx" ON "quizzes"("slug");

-- CreateIndex
CREATE INDEX "quizzes_category_idx" ON "quizzes"("category");

-- CreateIndex
CREATE INDEX "quizzes_subject_idx" ON "quizzes"("subject");

-- CreateIndex
CREATE INDEX "questions_quiz_id_idx" ON "questions"("quiz_id");

-- CreateIndex
CREATE INDEX "options_question_id_idx" ON "options"("question_id");

-- CreateIndex
CREATE INDEX "quiz_attempts_user_id_idx" ON "quiz_attempts"("user_id");

-- CreateIndex
CREATE INDEX "quiz_attempts_quiz_id_idx" ON "quiz_attempts"("quiz_id");

-- CreateIndex
CREATE INDEX "quiz_attempts_created_at_idx" ON "quiz_attempts"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_share_token_key" ON "certificates"("share_token");

-- CreateIndex
CREATE INDEX "certificates_user_id_idx" ON "certificates"("user_id");

-- CreateIndex
CREATE INDEX "certificates_share_token_idx" ON "certificates"("share_token");

-- CreateIndex
CREATE INDEX "certificates_type_idx" ON "certificates"("type");

-- CreateIndex
CREATE UNIQUE INDEX "daily_challenges_date_key" ON "daily_challenges"("date");

-- CreateIndex
CREATE INDEX "daily_challenges_date_idx" ON "daily_challenges"("date");

-- CreateIndex
CREATE INDEX "daily_challenges_challenge_type_idx" ON "daily_challenges"("challenge_type");

-- CreateIndex
CREATE INDEX "challenge_attempts_user_id_idx" ON "challenge_attempts"("user_id");

-- CreateIndex
CREATE INDEX "challenge_attempts_challenge_id_idx" ON "challenge_attempts"("challenge_id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_attempts_user_id_challenge_id_key" ON "challenge_attempts"("user_id", "challenge_id");

-- CreateIndex
CREATE INDEX "leaderboards_type_period_idx" ON "leaderboards"("type", "period");

-- CreateIndex
CREATE INDEX "leaderboards_user_id_idx" ON "leaderboards"("user_id");

-- CreateIndex
CREATE INDEX "leaderboards_rank_idx" ON "leaderboards"("rank");

-- CreateIndex
CREATE UNIQUE INDEX "seo_pages_slug_key" ON "seo_pages"("slug");

-- CreateIndex
CREATE INDEX "seo_pages_slug_idx" ON "seo_pages"("slug");

-- CreateIndex
CREATE INDEX "seo_pages_template_type_idx" ON "seo_pages"("template_type");

-- CreateIndex
CREATE INDEX "analytics_events_user_id_idx" ON "analytics_events"("user_id");

-- CreateIndex
CREATE INDEX "analytics_events_event_type_idx" ON "analytics_events"("event_type");

-- CreateIndex
CREATE INDEX "analytics_events_created_at_idx" ON "analytics_events"("created_at");

-- CreateIndex
CREATE INDEX "analytics_events_session_id_idx" ON "analytics_events"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBadges_AB_unique" ON "_UserBadges"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBadges_B_index" ON "_UserBadges"("B");
