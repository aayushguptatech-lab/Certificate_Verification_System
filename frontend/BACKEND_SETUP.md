# Backend Integration Guide for Certificate Verification System

This guide will help you set up the backend to work with this frontend application.

## Architecture Overview

```
Frontend (React + Vite)  →  Backend (Node.js/Express)  →  Database (MongoDB)
   Port: 3000              Port: 5000                    
```

## Backend Setup Instructions

### 1. Create Backend Project Structure

```bash
mkdir certificate-verification-backend
cd certificate-verification-backend
npm init -y
npm install express cors mongodb dotenv bcryptjs jsonwebtoken multer
npm install --save-dev nodemon typescript
```

### 2. Project Structure

```
certificate-verification-backend/
├── src/
│   ├── config/
│   │   └── database.js      # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── certificateController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Certificate.js
│   │   └── Verification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── certificateRoutes.js
│   │   └── userRoutes.js
│   └── app.js
├── .env
├── .env.example
├── server.js
└── package.json
```

### 3. Core Files Structure

#### `server.js`
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes will go here
// app.use('/api/auth', authRoutes);
// app.use('/api/certificates', certificateRoutes);
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 4. Environment Variables (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/certificate-verification
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### 5. API Endpoints to Implement

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

#### Certificates
- `GET /api/certificates` - Get user's certificates
- `GET /api/certificates/:id` - Get specific certificate
- `POST /api/certificates` - Create new certificate
- `PUT /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate
- `POST /api/certificates/verify` - Verify a certificate

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `DELETE /api/users/account` - Delete account

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  password: String (hashed),
  accountType: String (individual/institution/employer),
  createdAt: Date,
  updatedAt: Date
}
```

### Certificate Model
```javascript
{
  _id: ObjectId,
  certificateId: String (unique),
  userId: ObjectId (reference to User),
  title: String,
  issuer: String,
  issueDate: Date,
  expiryDate: Date,
  recipientName: String,
  description: String,
  status: String (active/expired/revoked),
  verificationCode: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Verification Log Model
```javascript
{
  _id: ObjectId,
  certificateId: String,
  verifiedBy: String,
  verificationDate: Date,
  ipAddress: String,
  userAgent: String,
  status: String (verified/failed)
}
```

## Connecting Frontend to Backend

### 1. Update Environment Variables

Create `.env.local` in the frontend root:
```
VITE_API_URL=http://localhost:5000/api
```

### 2. Use API Client in Components

```typescript
import apiClient from '@/utils/api'

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password
    })
    localStorage.setItem('authToken', response.data.token)
    navigate('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
```

### 3. Handle Authentication State

Create a context or state management solution:
```typescript
// AuthContext.tsx
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## Testing the Integration

### Backend Development Server
```bash
npm run dev  # with nodemon
```

### Frontend Development Server
```bash
npm run dev
```

Both should run simultaneously on ports 5000 and 3000 respectively.

## CORS Configuration

Ensure your backend has proper CORS settings:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173' // Vite default
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

## Security Checklist

- [ ] Implement JWT authentication
- [ ] Hash passwords with bcrypt
- [ ] Validate all inputs on backend
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Implement proper error handling
- [ ] Use environment variables for sensitive data
- [ ] Implement HTTPS in production
- [ ] Add request/response encryption if needed
- [ ] Implement proper access control

## Deployment Considerations

### Frontend (Vercel, Netlify, GitHub Pages)
```bash
npm run build
```

### Backend (Heroku, Railway, Render)
- Set environment variables on hosting platform
- Configure MongoDB Atlas for database
- Update CORS origins for production domain

## Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Authentication](https://jwt.io)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured correctly
- Check that frontend and backend URLs match in configuration

### API Calls Not Working
- Verify backend is running on port 5000
- Check network tab in browser dev tools
- Verify API endpoint paths match

### Authentication Issues
- Ensure JWT token is being stored correctly
- Check token is being sent in Authorization header
- Verify JWT secret is consistent between server and auth

---

**Need help?** Refer to the Frontend Integration section in the main README or the API configuration in `src/utils/api.ts`
