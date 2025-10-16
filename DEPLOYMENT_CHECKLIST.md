# 🚀 GitHub Pages Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. Update Configuration Files
Before deploying, you MUST update these files with your actual GitHub username:

#### `package.json` (Line 5)
```json
"homepage": "https://YOUR_USERNAME.github.io/portfolio"
```
Replace `YOUR_USERNAME` with your actual GitHub username.

#### `next.config.ts` (Lines 11-13)
```typescript
basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
```
Replace `/portfolio` with your repository name if different.

#### `src/app/layout.tsx` (Line 27)
```typescript
url: "https://YOUR_USERNAME.github.io/portfolio",
```
Replace `YOUR_USERNAME` with your actual GitHub username.

### 2. Repository Setup
- [ ] Create a new repository on GitHub named `portfolio`
- [ ] Or use any name, but update the `basePath` accordingly
- [ ] Make sure the repository is Public (for free GitHub Pages)

## 🎯 Deployment Options

### Option 1: Automatic Deployment (Recommended)
1. Push your code to the `main` branch
2. Go to repository Settings → Pages
3. Source: Select "GitHub Actions"
4. The workflow will automatically build and deploy your site
5. Your site will be available at: `https://YOUR_USERNAME.github.io/portfolio`

### Option 2: Manual Deployment
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Run: `npm run deploy`
3. Enable GitHub Pages in repository settings
4. Select `gh-pages` branch as the source

### Option 3: Build and Upload
1. Run: `npm run build:github`
2. Upload the `out` folder to a `gh-pages` branch
3. Enable GitHub Pages with `gh-pages` branch as source

## 🔧 Testing Locally
```bash
# Test the build process
npm run build:github

# Check the generated files
ls -la out/
```

## 📁 Important Files Created
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `next.config.ts` - Configured for GitHub Pages
- `package.json` - Updated with deployment scripts
- `README.md` - Updated with deployment instructions

## ⚠️ Important Notes

1. **Repository Name**: If you use a different repository name, update the `basePath` in `next.config.ts`
2. **Private Repositories**: GitHub Pages is free for public repos, requires paid plan for private repos
3. **Build Time**: First deployment may take 5-10 minutes
4. **HTTPS**: GitHub Pages automatically provides HTTPS

## 🎉 After Deployment

Once deployed, your portfolio will include:
- ✅ Interactive fluid smoke animation
- ✅ Responsive design
- ✅ Dark/light theme toggle
- ✅ All sections (About, Education, Skills, etc.)
- ✅ Contact form (frontend only)
- ✅ Social media links
- ✅ Performance optimization

## 🔗 Useful Links

- GitHub Pages Documentation: https://docs.github.com/en/pages
- GitHub Actions Documentation: https://docs.github.com/en/actions
- Next.js Static Export: https://nextjs.org/docs/advanced-features/static-html-export

---

**🚀 Your portfolio is ready for GitHub Pages deployment!**