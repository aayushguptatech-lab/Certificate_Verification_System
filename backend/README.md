# Certificate Verification Backend

Express + TypeScript backend with MySQL for the existing frontend.

## 1. Setup

1. Copy `.env.example` to `.env` and update DB/JWT values.
2. Create MySQL database using the value of `DB_NAME`.
3. Install dependencies:

```bash
npm install
```

4. Run migrations:

```bash
npm run migrate
```

5. Seed admin + sample certificates:

```bash
npm run seed
```

6. Start API in dev mode:

```bash
npm run dev
```

Server runs on `http://localhost:5000` by default.
Base API URL: `http://localhost:5000/api`

## 2. Frontend Connection

Set frontend env:

```bash
VITE_API_URL=http://localhost:5000/api
```

## 3. Auth Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/admin-login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/profile`

## 4. Certificate Endpoints

- `GET /api/certificates` (auth)
- `POST /api/certificates` (auth)
- `GET /api/certificates/:id` (auth)
- `PUT /api/certificates/:id` (auth)
- `DELETE /api/certificates/:id` (auth)
- `POST /api/certificates/verify` (public)
- `GET /api/certificates/track?certificateId=...` (public)
- `GET /api/certificates/history` (auth)

## 5. User Endpoints

- `GET /api/users/profile`
- `PUT /api/users/profile`
- `POST /api/users/change-password`
- `POST /api/users/account`

## 6. Seeded Admin

Uses values from env:

- `ADMIN_EMAIL` (default: `admin@certified.local`)
- `ADMIN_PASSWORD` (default: `admin123`)

For frontend `Admin Login`, use `adminId` equal to admin email.
