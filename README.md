# Certificate Verification System - Frontend

A modern, responsive web application for certificate verification built with the MERN stack. This is a **frontend-only** project that can be integrated with a backend and database in the future.

## 🌟 Features

- **Certificate Verification**: Quick and secure certificate validation
- **User Authentication**: Login and registration with secure password handling
- **User Dashboard**: Manage certificates and view verification history
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and Lucide icons
- **Type Safety**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📁 Project Structure

```
certificate-verification-system/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar component
│   │   └── Footer.tsx          # Footer component
│   ├── pages/
│   │   ├── Home.tsx            # Landing page
│   │   ├── VerifyCertificate.tsx # Certificate verification page
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── NotFound.tsx        # 404 page
│   │   └── auth/
│   │       ├── Login.tsx       # Login page
│   │       └── Register.tsx    # Registration page
│   ├── utils/
│   │   ├── api.ts             # API client configuration
│   │   └── constants.ts       # Application constants
│   ├── App.tsx                # Main app component with routing
│   ├── index.css              # Global styles
│   └── main.tsx               # React entry point
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
```bash
cd "Certificate Verification System"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will start at `http://localhost:3000`

## 📝 Available Scripts

### Development
```bash
npm run dev
```
Launch the development server with hot module replacement.

### Build
```bash
npm run build
```
Build the project for production.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Lint
```bash
npm run lint
```
Run ESLint to check code quality.

## 🎨 Pages Overview

### Home (`/`)
- Hero section with call-to-action
- Features showcase
- How it works guide
- Statistics section
- Trust indicators

### Verify Certificate (`/verify`)
- Certificate ID input
- Recipient name verification
- Real-time verification results
- Detailed certificate information display

### Login (`/login`)
- Email authentication
- Password management
- Remember me option
- Social login placeholders
- Link to register page

### Register (`/register`)
- Account type selection (Individual/Institution/Employer)
- Form validation
- Password confirmation
- Terms and conditions agreement
- Benefits showcase

### Dashboard (`/dashboard`)
- Certificate management
- Verification history
- User profile information
- Quick action buttons
- Statistics overview

## 🔌 Backend Integration (For Future Use)

The application is configured to connect to a backend API running on `http://localhost:5000`. To integrate the backend:

1. **Create your backend** (Node.js/Express)
2. **Update API endpoints** in `src/utils/constants.ts`
3. **Implement API calls** in your desired pages using the `apiClient` from `src/utils/api.ts`

### Example API Integration:

```typescript
import apiClient from '@/utils/api'

// Login example
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password })
    localStorage.setItem('authToken', response.data.token)
    // Redirect to dashboard
  } catch (error) {
    console.error('Login failed:', error)
  }
}
```

## 🎨 Customization

### Colors
Modify colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#1e40af',
      secondary: '#7c3aed',
      accent: '#f59e0b',
    },
  },
}
```

### Branding
Update the app name "Certified" to your brand name in:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `index.html`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Considerations

- Sensitive data (auth tokens) are stored in `localStorage`
- Implement proper backend validation
- Use HTTPS in production
- Implement CORS properly on backend
- Validate all user inputs

## 📦 Dependencies

- `react`: UI framework
- `react-router-dom`: Client-side routing
- `axios`: HTTP client
- `tailwindcss`: Utility-first CSS framework
- `lucide-react`: Icon library
- `typescript`: Type-safe JavaScript

## 🧪 Testing (Future Implementation)

Consider adding:
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)

## 💡 Future Enhancements

- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Advanced filtering and search
- [ ] Certificate export in multiple formats
- [ ] Integration with blockchain for verification
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Admin dashboard
- [ ] Analytics and reporting

## 🤝 Contributing

Feel free to fork, modify, and use this project as a base for your Certificate Verification System.

## 📄 License

This project is open source and available for personal and commercial use.

## 📧 Support

For integration help or questions about setting up the backend, refer to the API configuration in `src/utils/api.ts` and backend endpoint mapping in `src/utils/constants.ts`.

---

**Happy coding! 🚀**
