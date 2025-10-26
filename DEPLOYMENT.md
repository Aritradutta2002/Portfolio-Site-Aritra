# 🚀 Deployment Guide

## ✅ Repository Ready for Upload!

Your project is now clean, structured, and ready to deploy.

## 📦 What's Included

```
Portfolio-Aritra/
├── frontend/          # Next.js React app
├── backend/          # Spring Boot API
├── pom.xml           # Root build file
├── .gitignore        # Ignores build artifacts
└── README.md         # Documentation
```

## 🌐 Push to GitHub

```bash
# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## 🚀 Deploy Options

### Option 1: Deploy to Vercel (Frontend Only) ⚡ FASTEST

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Vercel auto-detects Next.js
4. Set root directory: `frontend`
5. Deploy! 🎉

**Environment Variables (if needed):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Option 2: Deploy JAR to Railway (Full Stack)

1. Build the JAR:
```bash
mvn clean package -DskipTests
```

2. Go to [railway.app](https://railway.app)
3. Create new project
4. Deploy from GitHub or upload JAR
5. Railway auto-detects Java

**Environment Variables:**
```
JAVA_OPTS=-Xmx512m
PORT=8080
```

### Option 3: Deploy JAR to Render

1. Build JAR: `mvn clean package -DskipTests`
2. Go to [render.com](https://render.com)
3. Create Web Service
4. Select Java
5. Upload or connect GitHub
6. Start command: `java -jar target/portfolio-fullstack-1.0.0.jar`

### Option 4: Separate Deployment

**Frontend → Vercel**
- Root directory: `frontend/`
- Build command: `npm run build`
- Output directory: `out/`

**Backend → Railway/Render**
- Upload JAR or deploy from GitHub
- Java 17+ runtime

## 🔧 Before Deployment

### Test Build Locally
```bash
mvn clean package -DskipTests
java -jar target/portfolio-fullstack-1.0.0.jar
```
Visit http://localhost:8080

### Frontend Development
```bash
cd frontend
npm run dev
```
Visit http://localhost:3000

### Backend Development
```bash
cd backend
mvn spring-boot:run
```
Visit http://localhost:8080

## 📝 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_EMAIL_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=your_public_key
```

### Backend (application.yml)
```yaml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:h2:mem:testdb
```

## ✨ Quick Deploy Checklist

- [x] Git repository initialized
- [x] All files committed
- [x] .gitignore configured
- [x] Build tested locally
- [x] Ready to push to GitHub
- [ ] Push to GitHub
- [ ] Deploy to Vercel/Railway
- [ ] Configure environment variables
- [ ] Test production deployment

## 🎯 Recommended: Vercel

**Easiest and fastest deployment:**
1. Push to GitHub
2. Import to Vercel
3. Set root: `frontend/`
4. Deploy ✅

**Your site will be live in ~2 minutes!**

---

**Need help?** Check the main README.md for build commands.
