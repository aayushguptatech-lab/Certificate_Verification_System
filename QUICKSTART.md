# Quick Start Guide

## 🚀 Start Development Server

```bash
npm run dev
```

The application will open at **http://localhost:3000**

## 📦 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🗂️ Project Structure at a Glance

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Top navigation
│   └── Footer.tsx      # Bottom footer
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── VerifyCertificate.tsx  # Certificate verification
│   ├── Dashboard.tsx   # User dashboard
│   ├── NotFound.tsx    # 404 page
│   └── auth/
│       ├── Login.tsx   # Login page
│       └── Register.tsx # Registration page
├── utils/              # Utility functions
│   ├── api.ts         # API client setup
│   └── constants.ts   # App constants
├── App.tsx            # Main app with routing
├── main.tsx           # React entry point
└── index.css          # Global styles
```

## 🎯 Main Features Implemented

✅ **Home Page** - Landing page with features showcase  
✅ **Certificate Verification** - Search and verify certificates  
✅ **User Authentication** - Login & registration forms  
✅ **Dashboard** - User profile and certificate management  
✅ **Responsive Design** - Mobile, tablet, desktop support  
✅ **Modern UI** - Tailwind CSS + Lucide icons  

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variables template

## 🌐 Navigation Menu

- **Home** - `/`
- **Verify Certificate** - `/verify`
- **Login** - `/login`
- **Register** - `/register`
- **Dashboard** - `/dashboard`

## 🎨 Customization Tips

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#1e40af',      // Change this
  secondary: '#7c3aed',    // Change this
  accent: '#f59e0b',       // Change this
}
```

### Update App Title
Change in `index.html`:
```html
<title>Certificate Verification System</title>
```

### Customize Branding
Update "Certified" text in:
- `src/components/Navbar.tsx` (line with "Award" icon)
- `src/components/Footer.tsx`
- `README.md`

## ⚙️ Backend Integration

Ready to add a backend? Check `BACKEND_SETUP.md` for:
- Backend project structure
- API endpoint definitions
- Database models
- Integration examples

## 🔗 API Integration Quick Reference

The app is configured to call APIs at: `http://localhost:5000/api`

Example of making an API call:
```typescript
import apiClient from '@/utils/api'

// Login request
const response = await apiClient.post('/auth/login', {
  email: 'user@example.com',
  password: 'password123'
})
```

See `src/utils/api.ts` for API client setup.

## 🧪 Testing the Frontend

1. **Home Page**: 
   - Click navigation links
   - Click "Verify Certificate" button

2. **Verification Page**:
   - Try entering certificate details
   - See verification form in action

3. **Login/Register**:
   - Fill out and submit forms
   - Forms have built-in validation

4. **Dashboard**:
   - View dummy data for certificates
   - Test table interactions

## 📱 Responsive Testing

Test responsiveness using browser DevTools:
- `F12` to open DevTools
- Click device toolbar icon
- Choose different device sizes

## ⚡ Performance Tips

- Lazy load pages using React.lazy()
- Optimize images
- Use code splitting by route
- Minimize bundle size

## 🐛 Debugging

Enable DevTools:
1. Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/) browser extension
2. Open browser DevTools (F12)
3. Check Components and Profiler tabs

## 📚 Next Steps

1. **Review the code** - Understand component structure
2. **Customize styling** - Update colors and branding
3. **Set up backend** - Follow BACKEND_SETUP.md
4. **Add API integration** - Connect to your backend
5. **Deploy** - Deploy to Vercel, Netlify, etc.

## 🆘 Common Issues

**Port 3000 already in use?**
```bash
# Use different port
npm run dev -- --port 3001
```

**Module not found?**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**Styling not working?**
```bash
# Rebuild Tailwind CSS
npm run build
```

## 📞 Support Resources

- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev
- React Router: https://reactrouter.com

---

**Happy coding! 🎉**
