# Team-13-1 Mentorship Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Supabase Integration

This project uses [Supabase](https://supabase.com/) for authentication, database, and storage. The integration is set up with:

- Authentication with email/password and OAuth providers
- Database tables for users, mentors, and mentees
- Row-level security policies for data protection
- TypeScript types generated from the database schema

### Environment Variables

Make sure to set up the following environment variables:

```bash
# Public (browser-safe) variables
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Server-only (never expose to the browser)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
```

## Test Accounts for Quick Login

The application includes quick login functionality for development and testing purposes. On the login page, you'll see "Quick Login" buttons to easily fill in credentials for either a mentor or mentee account.

### Available Test Accounts

| Role | Email | Password | Quick Login Button |
|------|-------|----------|-------------------|
| Mentor | mentor@example.com | mentor123 | "Login as Mentor" |
| Mentee | mentee@example.com | mentee123 | "Login as Mentee" |

To use this feature:
1. Click the "Login as Mentor" or "Login as Mentee" button to auto-fill credentials
2. Click the "Welcome Back" button to complete the login
3. You'll be redirected to the appropriate dashboard based on the role

These accounts must be created in your Supabase database before they can be used with the quick login feature. You can create them:

- Directly through the Supabase Dashboard
- Using the provided seed script: `npm run seed`

See [Test Accounts Documentation](docs/test-accounts.md) for more details about implementation and customization.

## Database Schema

The application uses Supabase for data storage with the following main tables:

- `users`: Stores user information including role (mentor or student)
- `onboarding_progress`: Tracks user progress through the onboarding flow
- `samples`: Example table for development purposes

TypeScript types for the database schema are available in `lib/database.types.ts`.

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Environment Setup

When deploying, make sure to set all required environment variables in your hosting platform, including the Supabase credentials.
