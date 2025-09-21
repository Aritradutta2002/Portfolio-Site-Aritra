# 🚀 Aritra Dutta - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Showcasing my journey as a Software Engineer at TCS with a focus on competitive programming, full-stack development, and clean code practices.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8)

## ✨ Features

### 🎨 **Modern Design**
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion powered interactions and transitions
- **Gradient Aesthetics**: Beautiful gradient backgrounds and effects

### 🔧 **Technical Excellence**
- **Next.js 15**: Latest features with App Router
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first styling with custom components
- **Performance Optimized**: Lazy loading, image optimization, and code splitting

### 📱 **Sections**
- **Hero**: Animated profile with call-to-action buttons
- **About**: Personal story, education timeline, and achievements
- **Skills**: Interactive skill bars with competitive programming stats
- **Projects**: Filterable project showcase with detailed modals
- **Experience**: Professional journey and current role at TCS
- **Blog**: Technical articles and insights (expandable)
- **Contact**: Working contact form with multiple options

### ♿ **Accessibility**
- **WCAG Compliant**: Proper semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Optimized for assistive technologies
- **Motion Preferences**: Respects `prefers-reduced-motion`
- **Accessibility Settings**: Built-in accessibility controls panel

### 🛡️ **Reliability**
- **Error Boundaries**: Graceful error handling
- **Loading States**: Smooth loading experiences
- **Performance Monitoring**: Built-in performance tracking
- **SEO Optimized**: Meta tags, structured data, and social sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aritradutta2002/Portfolio-Site-Aritra.git
   cd Portfolio-Site-Aritra
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your EmailJS credentials for contact form functionality.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and accessibility CSS
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── About.tsx          # About section
│   ├── AccessibilityProvider.tsx  # Accessibility context
│   ├── AnimatedBackground.tsx     # Background animations
│   ├── Blog.tsx           # Blog section
│   ├── Contact.tsx        # Contact form
│   ├── ErrorBoundary.tsx  # Error handling
│   ├── Experience.tsx     # Work experience
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── LoadingSpinner.tsx # Loading components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Projects.tsx       # Projects showcase
│   ├── Skills.tsx         # Skills and certifications
│   ├── ThemeProvider.tsx  # Theme context
│   └── ThemeToggle.tsx    # Dark/light mode toggle
├── hooks/                 # Custom React hooks
│   └── usePerformance.ts  # Performance monitoring
└── lib/                   # Utility functions
    └── email-config.ts    # Email configuration
```

## 🎯 Key Highlights

### **Competitive Programming**
- **LeetCode Rating**: 1750 (Max)
- **CodeChef Rating**: 1604 (3-Star)
- **Problems Solved**: 500+ across multiple platforms
- **CodeForces**: Global Rank 1046 in Round 967 div 2

### **Technical Skills**
- **Languages**: Java, JavaScript, TypeScript, C++, Python
- **Frameworks**: Spring Boot, Angular, React, Next.js
- **Databases**: MySQL, PostgreSQL
- **Tools**: Git, Docker, AWS, Linux/UNIX

### **Featured Projects**
- **Algorithm Visualizer**: Interactive sorting algorithm visualization
- **HuffZip**: File compression tool using Huffman Coding
- **ChatGPT Clone**: Streamlit-powered AI interface
- **LeetCode Directory**: 537+ commits of problem solutions

## 🔧 Configuration

### **Email Setup (Optional)**
To enable the contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Add your credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### **Resume Download**
Replace `/public/resume.pdf` with your actual resume file.

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### **Netlify**
1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)

### **Other Platforms**
The project supports any platform that can host static sites or Node.js applications.

## 🤝 Contributing

While this is a personal portfolio, I welcome suggestions and improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: [aritradutta049@gmail.com](mailto:aritradutta049@gmail.com)
- **LinkedIn**: [Aritra Dutta](https://www.linkedin.com/in/aritra-dutta-rick20/)
- **GitHub**: [Aritradutta2002](https://github.com/Aritradutta2002)
- **Location**: Bhubaneswar, Odisha, India

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by [Aritra Dutta](https://github.com/Aritradutta2002)
