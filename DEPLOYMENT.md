# Deployment Guide

This guide covers deploying your Certificate Verification System frontend to production.

## 🚀 Deployment Options

### 1. Vercel (Recommended)

**Best for:** Easiest deployment with automatic optimization

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up / Log in with GitHub
   - Import your repository
   - Deploy (automatic)

3. **Configure Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-api.com/api`

**Benefits:**
- Zero configuration needed
- Automatic HTTPS
- Built-in CI/CD
- Serverless functions support

### 2. Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Connect GitHub repository
   - Select repository

2. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy

3. **Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add environment variables

**Benefits:**
- Easy GitHub integration
- Automatic deployments on push
- Form handling support
- Edge functions

### 3. GitHub Pages

1. **Update vite.config.ts**
```typescript
export default {
  base: '/certificate-verification-system/',
  // ... rest of config
}
```

2. **Deploy Script** (add to package.json)
```json
"deploy": "gh-pages -d dist"
```

3. **Install and Deploy**
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

### 4. Traditional Hosting (Shared/VPS)

1. **Build the project**
```bash
npm run build
```

2. **Upload `dist` folder**
   - Use FTP or SSH
   - Upload entire `dist/` folder to public_html or www directory

3. **Configure Server**
   - Ensure `.htaccess` for SPA routing (if Apache):
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 🔒 Production Checklist

Before deploying, ensure:

- [ ] Environment variables are configured
- [ ] API endpoints point to production backend
- [ ] HTTPS is enabled
- [ ] Security headers are set
- [ ] CORS is configured properly
- [ ] Error logging is set up
- [ ] Performance is optimized
- [ ] SEO meta tags are updated

## ⚙️ Environment Configuration

Create `.env.production` for production settings:

```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=Certified
VITE_LOG_LEVEL=error
```

### Build with Production Environment

```bash
# Automatic when building
npm run build
```

## 📊 CI/CD Pipeline Example (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📈 Performance Optimization

### Before Deploying

1. **Analyze Bundle**
```bash
npm run build
```

2. **Check bundle size**
   - Use [Bundle Analyzer](https://www.npmjs.com/package/rollup-plugin-visualizer)

3. **Optimize Images**
   - Use optimized icon library (Lucide)
   - Compress hero images

4. **Code Splitting**
```typescript
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))

// Usage
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

## 🔐 Security Headers

Add security headers to your server:

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 🌍 Domain Configuration

1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **Point DNS to hosting**
   - Vercel: Add CNAME records
   - Netlify: Add A records
   - Traditional: Use A records
3. **Set up HTTPS** (automatic on most platforms)

## 🚨 Monitoring & Logging

### Sentry Integration (Error Tracking)

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "https://your-key@sentry.io/your-project",
  environment: process.env.NODE_ENV
})
```

### Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📞 Post-Deployment

1. **Test in production**
   - Verify all pages load
   - Test API connections
   - Check responsive design

2. **Set up monitoring**
   - Error tracking
   - Performance monitoring
   - Uptime monitoring

3. **Configure backups**
   - Database backups
   - Code backups
   - Regular snapshots

## 🆘 Troubleshooting

### Blank page after deploy
- Check if `base` is set correctly in vite.config
- Verify environment variables are set
- Check browser console for errors

### API calls not working
- Verify CORS on backend
- Check API URL in environment variables
- Ensure backend is deployed and accessible

### Routes not working
- Ensure SPA routing is configured on server
- For traditional hosting, add .htaccess rules
- For Netlify, add `_redirects` file

### Performance issues
- Check bundle size with `npm run build`
- Enable gzip compression on server
- Use CDN for assets
- Optimize images

## 💡 Recommended Deployment Flow

```
Development
    ↓
Git Push (GitHub)
    ↓
Automated Build (CI/CD)
    ↓
Automated Tests
    ↓
Deploy to Staging
    ↓
Manual Testing
    ↓
Deploy to Production
    ↓
Monitor & Log
```

## 📚 Deployment Platforms Comparison

| Platform | Best For | Price | Setup Time |
|----------|----------|-------|-----------|
| Vercel   | Next.js/React with optimization | Free tier available | 2 min |
| Netlify  | Static sites + serverless | Free tier available | 2 min |
| Heroku   | Full-stack apps | Paid only | 5 min |
| AWS      | Enterprise scaling | Pay-as-you-go | 15+ min |

## 🎯 Next Steps

1. Choose a deployment platform
2. Set up domain (optional)
3. Configure environment variables
4. Deploy the application
5. Set up monitoring
6. Test in production

---

**Deployment complete! 🎉**
