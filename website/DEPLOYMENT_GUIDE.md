# CakeAnatomy Website - Deployment Guide

## Production Checklist

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

For production, update this to your actual backend URL.

### Build and Deploy

#### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL`

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

#### Option 2: Manual Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

   The app will run on port 3000 by default.

#### Option 3: Docker

1. **Create Dockerfile** (already included)

2. **Build Docker image**
   ```bash
   docker build -t cakeanatomy-website .
   ```

3. **Run container**
   ```bash
   docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://your-api.com/api cakeanatomy-website
   ```

### Performance Optimizations

#### Image Optimization

All images are already using Next.js Image component for automatic optimization:
- WebP format conversion
- Lazy loading
- Responsive sizes

#### Code Splitting

Next.js automatically code-splits:
- Each page is a separate bundle
- Components are loaded on demand

#### Caching Strategy

Configure caching headers in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/:all*(svg|jpg|png|webp)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

### Security Checklist

- ✅ Environment variables for sensitive data
- ✅ HTTPS enabled in production
- ✅ Content Security Policy configured
- ✅ CORS properly configured on backend
- ✅ HTTP-only cookies for auth tokens
- ✅ Input validation on all forms
- ✅ Rate limiting on API

### Monitoring

#### Error Tracking

Integrate Sentry for error tracking:

```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.js`:

```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

#### Analytics

Add Google Analytics or Plausible:

```typescript
// app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### CDN Configuration

#### Vercel (Built-in CDN)
- Automatic global CDN
- Edge caching
- Image optimization

#### Cloudflare (Alternative)
1. Point domain to Cloudflare
2. Enable Auto Minify (HTML, CSS, JS)
3. Enable Brotli compression
4. Set up cache rules

### Database Considerations

Ensure your MongoDB backend is production-ready:

1. **Use MongoDB Atlas** for managed hosting
2. **Enable authentication**
3. **Set up backups**
4. **Configure connection pooling**
5. **Enable monitoring**

### SSL/TLS Certificate

#### Vercel
- Automatic SSL certificates
- Auto-renewal

#### Manual
Use Let's Encrypt:

```bash
certbot --nginx -d yourdomain.com
```

### Custom Domain Setup

1. **Add domain to hosting provider**
2. **Update DNS records**:
   - A record: Point to server IP
   - CNAME: Point to hosting provider
3. **Verify domain**
4. **Enable SSL**

### Post-Deployment Testing

- [ ] Test all authentication flows
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test payment methods (use test mode first)
- [ ] Verify email notifications
- [ ] Test on mobile devices
- [ ] Check page load times
- [ ] Verify SEO meta tags
- [ ] Test all API endpoints
- [ ] Check error handling

### Backup Strategy

1. **Database backups**
   - Daily automated backups
   - Keep 30 days of history
   - Test restore process

2. **Code backups**
   - Git repository (already done)
   - Regular commits
   - Tag releases

### Scaling Considerations

#### Horizontal Scaling
- Use load balancer (Nginx, AWS ALB)
- Multiple Next.js instances
- Session sharing via Redis

#### Vertical Scaling
- Increase server resources
- Optimize database queries
- Enable CDN caching

### Maintenance Mode

Create a maintenance page at `app/maintenance/page.tsx`:

```typescript
export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
        <p>We'll be back soon!</p>
      </div>
    </div>
  );
}
```

### Environment-Specific Configuration

```typescript
// lib/config.ts
export const config = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
};
```

### Rollback Plan

1. **Keep previous version tagged**
2. **Quick rollback command**:
   ```bash
   vercel rollback
   ```
3. **Database migration rollback**
4. **Monitor for issues**

### Launch Checklist

- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Custom domain connected
- [ ] Error tracking enabled
- [ ] Analytics installed
- [ ] SEO optimized
- [ ] Performance tested
- [ ] Security audit completed
- [ ] Backup system verified
- [ ] Monitoring alerts set up
- [ ] Documentation updated
- [ ] Team trained

## Support

For issues or questions:
- Check logs in hosting dashboard
- Review error tracking (Sentry)
- Contact backend team for API issues
- Review documentation

---

**Last Updated**: April 2026
