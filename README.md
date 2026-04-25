# Aritra Portfolio

A modern, responsive portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Project Structure

```
Portfolio/
├── portfolio/              # Next.js React Frontend
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React Components
│   │   ├── hooks/         # Custom Hooks
│   │   ├── lib/           # Utilities
│   │   └── data/          # Static Data
│   ├── public/            # Static Assets
│   └── package.json
│
└── README.md
```

## Development

```bash
cd portfolio
npm install
npm run dev
```

Runs on http://localhost:3000

## Build

```bash
cd portfolio
npm run build
```

## Deploy

The `portfolio/out` folder contains static files ready for deployment to Vercel, Netlify, or any static host.

## Features

- **Responsive Design** - Works on all devices
- **Dark Mode** - Automatic theme switching
- **3D Background** - Interactive Three.js scene
- **Blog Section** - Static blog posts with search & filtering
- **Contact Form** - Email integration via EmailJS
- **Smooth Animations** - Framer Motion animations
- **Accessibility** - WCAG compliant

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
- EmailJS

---

**Status:** Ready to Deploy
