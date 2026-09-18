# Expense Tracker — Backend (NestJS)

REST API for the Expense Tracker Web Application. Handles authentication, expense/income CRUD, and financial reports/aggregations.

**Live URL:** `https://expense-tracker-web-app-production-cbdd.up.railway.app`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS (TypeScript) |
| Database | MongoDB (Mongoose) |
| Auth | JWT (Passport strategy) + bcrypt |
| Validation | class-validator (DTOs) |
| Hosting | Railway |

---

## Project Structure

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts     → POST /auth/register, /auth/login, GET /auth/profile
│   ├── auth.service.ts        → register/login logic, JWT signing
│   ├── jwt.strategy.ts        → validates JWT on protected routes
│   ├── jwt-auth.guard.ts      → guard applied to protected controllers
│   └── dto/
├── users/
│   ├── user.schema.ts
│   ├── users.module.ts
│   └── users.service.ts
├── expenses/
│   ├── expense.schema.ts
│   ├── expenses.controller.ts
│   ├── expenses.service.ts
│   ├── expenses.module.ts
│   └── dto/
├── income/                     → same pattern as expenses
├── reports/
│   ├── reports.controller.ts  → GET /reports/summary, /category-wise, /monthly
│   ├── reports.service.ts     → Mongo aggregation pipelines
│   └── reports.module.ts
├── app.module.ts
└── main.ts                     → CORS, ValidationPipe, bootstrap
```

> **Note:** This project uses ESM (`"type": "module"` + `moduleResolution: "nodenext"`). Every relative import must include the `.js` extension, e.g. `import { AuthService } from './auth.service.js'`.

---

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | — | Create account, returns JWT |
| POST | `/auth/login` | — | Log in, returns JWT |
| GET | `/auth/profile` | ✅ | Get current user |

### Expenses (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/expenses` | Create expense |
| GET | `/expenses` | List own expenses |
| GET | `/expenses/:id` | Get one expense |
| PATCH | `/expenses/:id` | Update expense |
| DELETE | `/expenses/:id` | Delete expense |

### Income (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/income` | Create income |
| GET | `/income` | List own income |
| PATCH | `/income/:id` | Update income |
| DELETE | `/income/:id` | Delete income |

### Reports (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/reports/summary` | Total income, total expense, balance |
| GET | `/reports/category-wise` | Expense totals grouped by category |
| GET | `/reports/monthly` | Expense totals grouped by month |

All protected routes require:
```
Authorization: Bearer <access_token>
```

---

## Environment Variables

Create a `.env` file (never commit this):

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

> If `mongodb+srv://` fails to resolve on your network (`querySrv ECONNREFUSED`), use the **standard connection string** from Atlas → Connect → Drivers → toggle off "SRV Connection String" instead.

---

## Local Development

```bash
npm install
npm run start:dev
```

API runs at `http://localhost:5000`.

## Production Build

```bash
npm run build
npm run start:prod
```

---

## Deployment (Railway)

1. Push this repo to GitHub.
2. Railway → New Project → Deploy from GitHub repo.
3. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`) under the **Variables** tab.
4. Click **Deploy** to apply the variables (adding them alone does not redeploy).
5. Settings → Networking → **Generate Domain** to get a public URL.
6. In MongoDB Atlas → Network Access, make sure `0.0.0.0/0` is whitelisted — Railway's outbound IP is dynamic, so a fixed IP can't be whitelisted.

After deploying, update CORS in `main.ts` to the deployed frontend's origin (or `*` temporarily):
```ts
app.enableCors({ origin: 'https://your-frontend.vercel.app', credentials: true });
```

---

## Testing (Postman)

**Register:**
```
POST http://localhost:5000/auth/register
Content-Type: application/json

{
  "name": "Saumya",
  "email": "test@test.com",
  "password": "123456"
}
```

**Login:**
```
POST http://localhost:5000/auth/login
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "123456"
}
```

Copy `access_token` from the response and use it as a Bearer token for all protected routes.

---

## Common Issues & Fixes

| Symptom | Cause | Fix |
|---|---|---|
| `Cannot find module './xxx'` (many at once) | ESM requires explicit `.js` on relative imports | Add `.js` to every relative import |
| `querySrv ECONNREFUSED` | DNS can't resolve the SRV record on this network | Use the standard (non-SRV) connection string |
| `MongooseServerSelectionError: timed out` | IP not whitelisted in Atlas | Add `0.0.0.0/0` in Network Access |
| `UnknownDependenciesException: AuthModuleOptions` | `PassportModule` imported without `.register()` | Use `PassportModule.register({ defaultStrategy: 'jwt' })` |
| `secretOrPrivateKey must have a value` | `JWT_SECRET` read before `.env` finished loading | Use `JwtModule.registerAsync()` with `ConfigService` |
| `MongooseError: uri ... got "undefined"` on Railway | Environment variables added but not deployed | Click **Deploy** after adding variables — adding alone doesn't apply them |
| `Cannot POST /auth/register` (404) | Controller still has the empty class from `nest g resource` | Make sure the real controller code (with `@Post()` methods) was saved |
| 404/odd behavior persists after every fix | Stale `node.exe` processes holding the port | `taskkill /F /IM node.exe`, then restart fresh |
