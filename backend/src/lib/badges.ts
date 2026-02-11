import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';

export const badgeTypes = {
  // Typing Badges
  TYPING_ROOKIE: { name: 'Typing Rookie', description: 'Complete 10 typing tests.', iconUrl: '/badges/typing-rookie.svg' },
  TYPING_VETERAN: { name: 'Typing Veteran', description: 'Complete 100 typing tests.', iconUrl: '/badges/typing-veteran.svg' },
  SPEED_DEMON: { name: 'Speed Demon', description: 'Achieve a WPM of 100 or more.', iconUrl: '/badges/speed-demon.svg' },

  // Lesson/Quiz Badges
  KNOWLEDGE_SEEKER: { name: 'Knowledge Seeker', description: 'Complete your first lesson.', iconUrl: '/badges/knowledge-seeker.svg' },
  DILIGENT_LEARNER: { name: 'Diligent Learner', description: 'Complete 10 lessons.', iconUrl: '/badges/diligent-learner.svg' },
  QUIZ_MASTER: { name: 'Quiz Master', description: 'Score 100% on any quiz.', iconUrl: '/badges/quiz-master.svg' },

  // Streak Badges
  STREAK_STARTER: { name: 'Streak Starter', description: 'Achieve a 3-day streak.', iconUrl: '/badges/streak-starter.svg' },
  STREAK_CHAMPION: { name: 'Streak Champion', description: 'Achieve a 7-day streak.', iconUrl: '/badges/streak-champion.svg' },
};

type BadgeKey = keyof typeof badgeTypes;

/**
 * Checks user stats and awards new badges if criteria are met.
 * IMPORTANT: This function must be called within a Prisma transaction.
 * @param userId The ID of the user to check.
 * @param tx The Prisma transaction client.
 */
export async function checkAndAwardBadges(userId: string, tx: Prisma.TransactionClient) {
  const user = await tx.user.findUnique({
    where: { id: userId },
    include: { awardedBadges: { select: { name: true } } },
  });

  if (!user) return;

  const userBadges = new Set(user.awardedBadges.map((b) => b.name));
  const badgesToAward: BadgeKey[] = [];

  // Check typing badges
  const [typingTestCount, codeTypingTestCount] = await Promise.all([
    // This is for the generic typing test
    tx.typingTest.count({ where: { userId } }),
    // This is for the code-specific typing test
    tx.codeTypingTest.count({ where: { userId } }),
  ]);
  const totalTypingTests = typingTestCount + codeTypingTestCount;
  if (totalTypingTests >= 10 && !userBadges.has(badgeTypes.TYPING_ROOKIE.name)) {
    badgesToAward.push('TYPING_ROOKIE');
  }
  if (typingTestCount >= 100 && !userBadges.has(badgeTypes.TYPING_VETERAN.name)) {
    badgesToAward.push('TYPING_VETERAN');
  }
  if ((user.wpmBest ?? 0) >= 100 && !userBadges.has(badgeTypes.SPEED_DEMON.name)) {
    badgesToAward.push('SPEED_DEMON');
  }

  // Check lesson badges
  const completedLessonsCount = await tx.lessonProgress.count({ where: { userId, status: 'completed' } });
  if (completedLessonsCount >= 1 && !userBadges.has(badgeTypes.KNOWLEDGE_SEEKER.name)) {
    badgesToAward.push('KNOWLEDGE_SEEKER');
  }
  if (completedLessonsCount >= 10 && !userBadges.has(badgeTypes.DILIGENT_LEARNER.name)) {
    badgesToAward.push('DILIGENT_LEARNER');
  }

  // Check streak badges
  if (user.streakDays >= 3 && !userBadges.has(badgeTypes.STREAK_STARTER.name)) {
    badgesToAward.push('STREAK_STARTER');
  }
  if (user.streakDays >= 7 && !userBadges.has(badgeTypes.STREAK_CHAMPION.name)) {
    badgesToAward.push('STREAK_CHAMPION');
  }

  if (badgesToAward.length > 0) {
    const badgeNames = badgesToAward.map((key) => badgeTypes[key].name);
    const badgesInDb = await tx.badge.findMany({ where: { name: { in: badgeNames } } });

    if (badgesInDb.length > 0) {
      await tx.user.update({
        where: { id: userId },
        data: {
          awardedBadges: {
            connect: badgesInDb.map((b) => ({ id: b.id })),
          },
        },
      });
    }
  }
}

export async function seedBadges() {
  console.log('Seeding badges...');
  for (const key in badgeTypes) {
    const badge = badgeTypes[key as BadgeKey];
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: { description: badge.description, iconUrl: badge.iconUrl },
      create: { name: badge.name, description: badge.description, iconUrl: badge.iconUrl },
    });
  }
  console.log('Badges seeded.');
}