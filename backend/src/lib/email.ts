/**
 * Placeholder for an email sending utility.
 * In a real application, you would use a library like nodemailer
 * and an email service (SendGrid, Mailgun, AWS SES, etc.).
 */

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

export const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
  const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

  console.log('--- SENDING PASSWORD RESET EMAIL ---');
  console.log(`To: ${email}`);
  console.log(`Link: ${resetLink}`);
  console.log('------------------------------------');

  // In a real app, you would have your email sending logic here.
  // For example, using nodemailer:
  // await transporter.sendMail({ from: '...', to: email, subject: '...', html: `...<a href="${resetLink}">Reset Password</a>...` });

  return Promise.resolve();
};