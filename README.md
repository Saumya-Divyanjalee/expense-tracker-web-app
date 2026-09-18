# Expense Tracker Web Application

A full-stack Expense Tracker built with **Next.js** (frontend) and **NestJS** (backend), featuring income and expense management, financial reports with data visualization, and secure JWT-based user authentication.

---

## Tech Stack

| Part           | Technology                          |
|-----------------|--------------------------------------|
| Frontend        | Next.js 15/16 + TypeScript + Tailwind CSS |
| Backend         | NestJS + TypeScript                 |
| Database        | MongoDB (Mongoose)                  |
| Authentication  | JWT (Passport strategy) + bcrypt    |
| Charts          | Recharts                            |
| Validation      | class-validator (DTOs)              |

---

## Features

- **User Authentication** — Register, login, JWT-protected routes
- **Expense Management** — Create, read, update, delete expenses (title, amount, category, date, description)
- **Income Management** — Create, read, update, delete income entries (title, amount, source, date)
- **Financial Reports** — Total income, total expense, balance, category-wise breakdown, monthly summary
- **Data Visualization** — Bar chart (expenses by category), pie chart (income vs expense)
- **Data isolation** — Every user only sees their own records

---

## Project Structure

```
expense-tracker/
├── backend/                 → NestJS API
│   └── src/
│       ├── auth/            → Register, login, JWT strategy & guard
│       ├── users/            → User schema & service
│       ├── expenses/         → Expense CRUD
│       ├── income/           → Income CRUD
│       ├── reports/          → Summary, category-wise, monthly aggregation
│       ├── app.module.ts
│       └── main.ts
│
└── frontend/                 → Next.js UI
    ├── app/
    │   ├── login/
    │   ├── register/
    │   ├── dashboard/
    │   ├── expenses/
    │   ├── income/
    │   └── reports/
    ├── components/
    │   └── Navbar.tsx
    └── lib/
        └── api.ts             → Axios instance with JWT interceptor
```

---

## API Endpoints

### Auth
| Method | Endpoint         | Description            |
|--------|------------------|-------------------------|
| POST   | `/auth/register` | Create a new account   |
| POST   | `/auth/login`    | Log in, receive JWT     |
| GET    | `/auth/profile`  | Get current user (protected) |

### Expenses (JWT protected)
| Method | Endpoint          | Description        |
|--------|-------------------|----------------------|
| POST   | `/expenses`       | Create an expense    |
| GET    | `/expenses`       | List all expenses    |
| GET    | `/expenses/:id`   | Get one expense      |
| PATCH  | `/expenses/:id`   | Update an expense    |
| DELETE | `/expenses/:id`   | Delete an expense    |

### Income (JWT protected)
| Method | Endpoint        | Description       |
|--------|-----------------|--------------------|
| POST   | `/income`       | Create income      |
| GET    | `/income`       | List all income    |
| PATCH  | `/income/:id`   | Update income      |
| DELETE | `/income/:id`   | Delete income       |

### Reports (JWT protected)
| Method | Endpoint                  | Description                     |
|--------|---------------------------|----------------------------------|
| GET    | `/reports/summary`        | Total income, expense, balance  |
| GET    | `/reports/category-wise`  | Expense totals grouped by category |
| GET    | `/reports/monthly`        | Expense totals grouped by month |

---

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

> If you're on a network where the `mongodb+srv://` SRV lookup fails, use the **standard (non-SRV) connection string** from Atlas → Connect → Drivers → toggle off "SRV Connection String".

Run the backend:
```bash
npm run start:dev
```

Backend runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
npm install axios recharts
```

Run the frontend:
```bash
npm run dev
```

Frontend runs at `http://localhost:3000`.

---

## MongoDB Atlas Setup Checklist

1. **Database Access** → create a database user with a password.
2. **Network Access** → add your IP, or `0.0.0.0/0` (allow from anywhere) for development.
3. **Connect** → copy the connection string, replace `<db_password>` with the real password, and paste into `.env` as `MONGODB_URI`.

---

## Common Issues & Fixes (from setup)

| Symptom | Cause | Fix |
|---|---|---|
| `Cannot find module './xxx'` (many at once) | ESM (`"type": "module"` + `moduleResolution: nodenext`) requires explicit `.js` extensions on relative imports | Add `.js` to every relative import, e.g. `from './auth.service.js'` |
| `querySrv ECONNREFUSED` | DNS can't resolve the `mongodb+srv://` SRV record on this network | Use the standard (non-SRV) connection string with explicit shard hostnames |
| `MongooseServerSelectionError: Server selection timed out` | IP not whitelisted in Atlas Network Access | Add current IP or `0.0.0.0/0` in Atlas |
| `UnknownDependenciesException: AuthModuleOptions` | `PassportModule` imported without `.register()` | Use `PassportModule.register({ defaultStrategy: 'jwt' })` |
| `secretOrPrivateKey must have a value` | `JWT_SECRET` read via `process.env` before `.env` finished loading | Use `JwtModule.registerAsync()` with `ConfigService` |
| `Cannot POST /auth/register` (404) | Controller file still has the empty auto-generated class from `nest g resource` | Make sure the actual controller code (with `@Post()` methods) was saved, not left empty |
| 404/wrong behavior persists after every fix | Multiple stale `node.exe` processes still holding port 5000 | `taskkill /F /IM node.exe`, then restart backend and frontend fresh |

---

## Testing the API (Postman)

**Register:**
```
POST http://localhost:5000/auth/register
Body (JSON):
{
  "name": "Saumya",
  "email": "test@test.com",
  "password": "123456"
}
```

**Login:**
```
POST http://localhost:5000/auth/login
Body (JSON):
{
  "email": "test@test.com",
  "password": "123456"
}
```

Copy the `access_token` from the response and use it as a Bearer token for all protected routes (`/expenses`, `/income`, `/reports/*`).

---

## Deployment

- **Backend** → Render / Railway
- **Frontend** → Vercel
- Remember to update CORS origin in `main.ts` and the frontend's `baseURL` in `lib/api.ts` to the deployed backend URL.
