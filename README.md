# Expense Tracker

A REST API backend for tracking personal income and expenses, built with Express, Prisma, and PostgreSQL.

## Features

- User registration and login with JWT-based authentication
- CRUD operations for expenses and categories
- Dashboard endpoint for summarized expense data
- Password hashing with bcrypt

## Tech Stack

- Node.js / Express 5
- PostgreSQL via Prisma ORM
- JWT (`jsonwebtoken`) for auth
- bcrypt / bcryptjs for password hashing

## Project Structure

```
controllers/   Request handlers
services/      Business logic / DB access
routes/        Express route definitions
middleware/    Auth middleware
prisma/        Prisma schema and migrations
lib/           Prisma client instance
server.js      App entry point
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with:
   ```
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   PORT=5001
   JWT_SECRET=<your-secret>
   ```
3. Run database migrations and generate the Prisma client:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
4. Start the server:
   ```bash
   npm start
   ```

The server runs on `http://localhost:5001` by default (or the port set in `PORT`).

## API Endpoints

All endpoints except auth require a `Authorization: Bearer <token>` header.

### Auth (`/api/auth`)
- `POST /register` — create a new user
- `POST /login` — authenticate and receive a JWT

### Expenses (`/api/expense`)
- `GET /` — list expenses
- `POST /` — create an expense
- `PUT /:id` — update an expense
- `DELETE /:id` — delete an expense

### Categories (`/api/category`)
- `GET /` — list categories
- `POST /` — create a category
- `PUT /:id` — update a category
- `DELETE /:id` — delete a category

### Dashboard (`/api/dashboard`)
- `GET /` — summarized expense data

## Data Model

- **User** — id, name, email, password, profilePhoto, expenses
- **Expense** — id, userId, categoryId, amount, type (`INCOME` | `EXPENSE`), note, date
- **Category** — id, name, color, expenses

## Deployment

The `build` script (`npx prisma generate && npx prisma migrate deploy`) is intended for deployment platforms (e.g. Railway) that run a build step before `npm start`.
