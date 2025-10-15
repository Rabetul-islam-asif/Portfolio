# Fluid Smoke Animation

A stunning Next.js application featuring advanced fluid dynamics smoke animation using WebGL. This project showcases a beautiful, interactive smoke effect that responds to mouse movements and clicks.

##  Features

- **Fluid Smoke Animation**: Real-time fluid dynamics simulation using WebGL
- **Interactive Effects**: Mouse movement creates smoke trails, clicks generate localized smoke puffs
- **Optimized Performance**: 60fps smooth rendering with WebGL2/WebGL support
- **Responsive Design**: Mobile-friendly with touch support
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui

##  Technical Highlights

### Fluid Smoke Component
- **Physics Simulation**: Navier-Stokes equations for realistic fluid behavior
- **Multi-pass Rendering**: Velocity, color, pressure, and vorticity calculations
- **Customizable Parameters**:
  - 40% reduced smoke size for delicate effects
  - 30% lower intensity for subtle visuals
  - Localized click effects without spreading

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui
- **Graphics**: WebGL2/WebGL for fluid simulation
- **Icons**: Lucide React

##  Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/fluid-smoke-animation.git
cd fluid-smoke-animation
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```


## 🎮 Interactive Features

- **Mouse Movement**: Creates flowing smoke trails that follow your cursor
- **Click Effects**: Generates localized smoke puffs that stay contained
- **Responsive**: Works seamlessly on desktop and mobile devices

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Deployment

### Netlify (Recommended for Static Hosting) 

This project is optimized for Netlify static deployment:

#### Option 1: Drag & Drop (Easiest)
1. Run `npm run build` to create the static files
2. Drag the `out` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Your site will be live instantly! 🎉

#### Option 2: Git Integration
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Set these build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18`
4. Click "Deploy site"

#### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=out
```

### Other Platforms



##  Customization

### Smoke Parameters
You can modify the smoke behavior in `src/components/FluidSmoke.tsx`:


##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Fluid dynamics inspired by WebGL computational fluid dynamics principles
