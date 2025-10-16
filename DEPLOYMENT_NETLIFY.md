# Netlify Deployment Guide

## 🚀 Deploy Your Portfolio to Netlify

### Prerequisites
- Netlify account (free)
- GitHub account
- Your portfolio code pushed to GitHub

### Step 1: Prepare Your Repository
1. Make sure all changes are committed to Git:
   ```bash
   git add .
   git commit -m "Configure for Netlify deployment"
   git push origin main
   ```

### Step 2: Deploy to Netlify

#### Option A: Drag & Drop (Easiest)
1. Run the build command locally:
   ```bash
   npm run build
   ```
2. Drag the `out` folder to the Netlify deploy page: https://app.netlify.com/drop

#### Option B: Git Integration (Recommended)
1. Go to [Netlify](https://app.netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select your portfolio repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18`
6. Click "Deploy site"

### Step 3: Configure Your Site
1. Once deployed, your site will be available at a random URL like `random-name-123456.netlify.app`
2. You can:
   - Change the site name to something custom
   - Add a custom domain
   - Configure SSL certificates

### Step 4: Update URLs in Your Code
After deployment, replace `https://your-portfolio.netlify.app` with your actual Netlify URL in:
- `src/app/layout.tsx` (metadata and structured data)
- `public/robots.txt`
- `public/sitemap.xml`

### Step 5: Test Your Site
- Check all pages load correctly
- Test navigation between sections
- Verify theme toggle works
- Test contact form (if implemented)
- Check mobile responsiveness

## 📁 File Structure for Netlify

```
your-portfolio/
├── netlify.toml          # Netlify configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── out/                  # Built files (generated)
├── public/               # Static files
│   ├── robots.txt
│   └── sitemap.xml
└── src/                  # Source code
```

## 🔧 Configuration Files

### netlify.toml
- Configures build settings
- Sets up caching headers
- Enables compression and optimization

### next.config.ts
- Enables static export (`output: 'export'`)
- Disables image optimization for static hosting
- Configured for Netlify deployment

## 🎯 Benefits of Netlify Deployment

✅ **Free hosting** for personal projects
✅ **Automatic HTTPS** and SSL certificates
✅ **Continuous deployment** from Git
✅ **Global CDN** for fast loading
✅ **Custom domains** support
✅ **Form handling** (if needed)
✅ **Edge functions** support
✅ **Analytics** and performance monitoring

## 🛠️ Build Commands

- `npm run build` - Build for production
- `npm run build:netlify` - Alias for Netlify build
- `npm run deploy:netlify` - Build and prepare for Netlify

## 📝 Notes

- The site is built as a static site for optimal performance
- All dynamic features (like theme toggle) work client-side
- No server-side rendering required
- Fast loading times with Netlify's CDN

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

### Routing Issues
- Ensure `trailingSlash: true` in next.config.ts
- Check that all internal links use `#` for sections

### Asset Loading Issues
- Verify `assetPrefix` is removed (not needed for Netlify)
- Check that all images and files are in the `public` folder

### Performance Issues
- Enable compression in netlify.toml
- Check that caching headers are set correctly
- Optimize images before uploading

Your portfolio is now ready for Netlify deployment! 🎉