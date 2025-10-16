# Rabetul Islam Asif - Portfolio

A stunning portfolio website showcasing the journey and skills of Rabetul Islam Asif, a passionate Computer Science student and future AI Developer. This project features advanced fluid dynamics animations, interactive effects, and a modern design built with Next.js 15 and cutting-edge web technologies.

## ✨ Features

- **Interactive Fluid Smoke Animation**: Real-time WebGL-based fluid dynamics simulation
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Beautiful theme switching with smooth transitions
- **Performance Optimized**: 60fps smooth animations and optimized loading
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Accessibility**: WCAG compliant with semantic HTML and ARIA support

## 🎨 Technical Highlights

### Advanced Animations
- **Fluid Smoke Component**: Navier-Stokes equations for realistic fluid behavior
- **Multi-layer Effects**: Snowfall, sparks, and smoke particles
- **Interactive Elements**: Mouse-responsive animations and click effects
- **Performance Monitoring**: Real-time performance tracking

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Graphics**: WebGL2/WebGL for fluid simulation
- **Icons**: Lucide React
- **Deployment**: GitHub Pages ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Deployment

### GitHub Pages (Recommended) ⭐

This project is optimized for GitHub Pages deployment:

#### Option 1: Automatic Deployment (GitHub Actions)
1. Push your code to the `main` branch
2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as the source
4. The site will automatically deploy on every push! 🎉

#### Option 2: Manual Deployment
1. Update `YOUR_USERNAME` in `package.json` and `next.config.ts`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Deploy manually:
```bash
npm run deploy
```

#### Option 3: Build and Upload
1. Build the project:
```bash
npm run build:github
```
2. Upload the `out` folder to your GitHub repository's GitHub Pages branch

### Configuration Required

Before deploying, update these files:

1. **package.json** - Replace `YOUR_USERNAME`:
```json
"homepage": "https://YOUR_USERNAME.github.io/portfolio"
```

2. **next.config.ts** - Replace `YOUR_USERNAME`:
```typescript
basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
```

3. **src/app/layout.tsx** - Update URL:
```typescript
url: "https://YOUR_USERNAME.github.io/portfolio",
```

### Other Platforms

#### Netlify
1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command: `npm run build`
3. Set publish directory: `out`

#### Vercel
1. Connect your repository to [Vercel](https://vercel.com)
2. Vercel will automatically detect and deploy your Next.js app

## 🎮 Interactive Features

- **Mouse Movement**: Creates flowing smoke trails that follow your cursor
- **Click Effects**: Generates localized smoke puffs that stay contained
- **Smooth Scrolling**: Animated navigation between sections
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Navigation**: Mobile-friendly hamburger menu

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:github` - Build optimized for GitHub Pages
- `npm run deploy` - Deploy to GitHub Pages (manual)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Customization

### Personal Information
Update your personal details in `src/app/page.tsx`:
- Name and title
- Education background
- Skills and languages
- Contact information
- Course certifications

### Smoke Parameters
Modify the smoke behavior in `src/components/FluidSmoke.tsx`:
```typescript
// Adjust smoke size
const SPLAT_RADIUS = 0.12; // Smaller = more delicate

// Adjust intensity
const SPLAT_FORCE = 4200; // Lower = subtler effect

// Modify dissipation rate
config.DISSIPATION = 0.98; // Higher = fades faster
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Fluid dynamics inspired by WebGL computational fluid dynamics principles
- Deployed on [GitHub Pages](https://pages.github.com/)

---

**👨‍💻 Created by Rabetul Islam Asif**
*Computer Science Student | Programmer | Future AI Developer*