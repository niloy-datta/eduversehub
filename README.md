# EduVerse Hub

🚀 **Market-dominating typing and programming learning platform**

## Features

### ⌨️ Typing Practice

- **Typing Test** - Time/Words mode with live WPM & accuracy
- **Code Typing** - Multi-language code snippets (JS, Python, Java, C++, etc.)
- **Race Mode** - Multiplayer AI racing competition
- **Custom Practice** - Practice with your own text
- **Lessons** - Progressive typing lessons

### 📝 Quizzes

- **Vocabulary Quiz** - SSC, HSC, IELTS with Bengali meanings
- **Subject Quiz** - Physics, Math, Higher Math, Biology, Chemistry
- **Word List** - Study mode with synonyms and examples

### 📊 Dashboard & Gamification

- Detailed statistics and analytics
- Achievement system with rarity levels
- Global leaderboards
- Test history tracking

### 🔐 Authentication

- Email/password login
- Google & GitHub OAuth (coming soon)
- JWT token-based sessions

## Tech Stack

### Frontend

- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- Premium dark theme with glass morphism

### Backend

- **Node.js** with Express
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/niloy-datta/eduversehub.git
cd eduversehub
```

2. Install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Setup environment variables:

```bash
# Backend (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/eduversehub"
JWT_SECRET="your-secret-key"
PORT=5000

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run database migrations:

```bash
cd backend
npx prisma migrate dev
```

5. Start development servers:

```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
cd frontend
npm run dev
```

## Project Structure

```
eduversehub/
├── frontend/           # Next.js frontend
│   ├── app/           # Pages and routes
│   ├── components/    # Reusable components
│   ├── contexts/      # React contexts (Auth)
│   └── lib/           # API client
├── backend/           # Express backend
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── middleware/
│   │   └── lib/      # Utilities
│   └── prisma/       # Database schema
└── README.md
```

## Pages (26 Total)

| Category  | Routes                                                                   |
| --------- | ------------------------------------------------------------------------ |
| Typing    | `/typing`, `/code-typing`, `/race`, `/practice`, `/lessons`, `/tips`     |
| Quizzes   | `/vocabulary`, `/vocabulary/wordlist`, `/quiz`, `/quiz/chemistry`        |
| Dashboard | `/dashboard`, `/statistics`, `/achievements`, `/leaderboard`, `/history` |
| Auth      | `/login`, `/register`, `/profile`, `/settings`                           |
| Info      | `/about`, `/contact`, `/pricing`, `/privacy`, `/terms`, `/404`           |

## License

MIT License

## Author

**Niloy Datta** - [GitHub](https://github.com/niloy-datta)
