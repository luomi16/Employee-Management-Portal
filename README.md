# Employee Management Portal

Welcome to the Employee Management Portal repository! 

This project is a comprehensive employee management system built using modern web technologies such as Next.js, MongoDB, Prisma, and GraphQL. The portal provides functionality for both employees and HR administrators, with features like user authentication, profile management, and visa document uploads.

## Key Technologies

- **Next.js**: Framework for server-side rendering (SSR) and client-side rendering (CSR).
- **MongoDB**: Database storage solution.
- **Prisma**: Database ORM for schema management and queries.
- **Next Auth V5**: User authentication, including registration, login, and logout.
- **GraphQL**: For efficient, flexible, and type-safe API queries and mutations.

---

## Features

### General
- Next Auth V5 integration for secure user authentication.
- Protected routes to safeguard sensitive pages and resources.
- GraphQL for API communication, enabling robust and scalable data handling.
- Zod for form validation to ensure data integrity.

### Employee Features
- User registration and login.
- View and update personal information based on the current user ID.
- Create and edit employee profiles through dynamic forms.
- Upload and manage documents, including visa files (Visa Management Page).
- Receive and view notifications.
- Interactive dashboard displaying personalized data.

### HR Features
- Comprehensive search functionality for employee records.
- View employee profiles in detail.
- Sort employees by last name for easier navigation.
- Manage employee onboarding status.
- Oversee employee visa documentation.
- Dedicated dashboard for HR-specific tasks and metrics.

---

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/luomi16/Employee-Management-Portal
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file using the provided `.env.example` file as a reference.

4. **Initialize Prisma**:
   Generate the Prisma client and push the database schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```

---

## Project Structure Highlights

- **Authentication Logic**: Managed in `auth.config.ts` and `app/lib/actions.ts`.
- **Form Validation**: Handled via Zod in `/lib/form-schemas.ts`.
- **Route Protection**: Middleware configuration in `middleware.ts`.

---

## Employee Management Features Overview

### Employees
- **Sign In / Sign Up**: Secure user authentication.
- **Personal Info**: Access and edit personal details by user ID.
- **Employee Form**: Create and edit employee-specific forms.
- **Document Management**: Upload and manage visa-related documents.
- **Notifications**: Receive updates and alerts.
- **Dashboard**: Overview of key metrics and activities.

### HR Administrators
- **Search Employees**: Find employee records efficiently.
- **Employee Profiles**: View and sort profiles.
- **Onboarding Management**: Track onboarding progress.
- **Visa Management**: Oversee visa documentation and updates.
- **HR Dashboard**: Access tools and data specific to HR roles.

---
