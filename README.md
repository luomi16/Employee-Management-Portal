# Employee Management Portal
This repository build a Next.js application with MongoDB, Prisma, and Next Auth **V5** project.

## Features

- Next Auth **V5** with user registration, login, and logout functionality
- Protected Routes
- Next.js framework for server-side rendering and client-side rendering
- MongoDB for database storage
- Prisma for database ORM

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables by creating a `.env` `or` `.env.local` file based on the `.env.example` file.
4. Generate and DB Push Prisma Client
```bash
npx prisma generate
npx prisma db push
```
5. Start the development server: `npm run dev`

## What you need to know

- `auth.config.ts` `&&` `app/lib/actions.ts` handles auth logic
- `/lib/form-schemas.ts` zod for form validation
- `middleware.ts` handles protected routes

## To Do List
- employee
    - signin, signup
    - fix get personal info by current user id
    - create, edit employee form
    - document upload (visa management page)
    - notification
    - dashboard

- hr
    - search
    - employee profile list page
    - view employee profile
    - sort employee by lastname
    - manage employee onboardingstatus
    - manage employee visa
    - dashboard