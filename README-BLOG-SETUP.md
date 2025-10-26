# Blog Setup Guide

## Overview

I've successfully added a comprehensive Spring Boot 3 backend API and a new dedicated blog page to your portfolio! Here's what has been implemented:

## 🎯 What's New

### 1. Spring Boot 3 Backend API
- **Full-featured blog management system**
- **Advanced search and filtering capabilities**
- **RESTful API with comprehensive endpoints**
- **Built-in security with role-based access**
- **Swagger documentation**
- **Caching for performance**
- **Sample data initialization**

### 2. Enhanced Frontend
- **Dedicated blog page** (`/blog`) with modern UI
- **Real-time API integration**
- **Advanced search and filtering**
- **Interactive blog post viewer**
- **Responsive design with animations**
- **Updated navigation from portfolio to blog**

## 🚀 Quick Start

### Step 1: Start the Backend API
```bash
# Navigate to the blog-backend directory
cd Portfolio-Aritra/blog-backend

# For Windows
start-blog-api.bat

# For Mac/Linux
./start-blog-api.sh
```

### Step 2: Start Your Next.js Frontend
```bash
# In your main portfolio directory
cd Portfolio-Aritra
npm run dev
```

### Step 3: Explore the Features
- **Portfolio**: http://localhost:3000 (click "View All Posts" in the blog section)
- **Blog Page**: http://localhost:3000/blog
- **API Documentation**: http://localhost:8080/api/swagger-ui.html
- **Database Console**: http://localhost:8080/api/h2-console

## 🔧 API Endpoints

### Public Endpoints (No Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/blog-posts` | Get all published posts (paginated) |
| GET | `/v1/blog-posts/{id}` | Get specific post by ID |
| GET | `/v1/blog-posts/featured` | Get featured posts |
| GET | `/v1/blog-posts/popular` | Get most popular posts |
| GET | `/v1/blog-posts/recent` | Get recent posts |
| GET | `/v1/blog-posts/category/{category}` | Get posts by category |
| GET | `/v1/blog-posts/search?keyword={keyword}` | Search posts |
| GET | `/v1/blog-posts/tag/{tag}` | Get posts by tag |
| GET | `/v1/blog-posts/{id}/related` | Get related posts |
| POST | `/v1/blog-posts/{id}/like` | Like a post |

### Admin Endpoints (Requires Auth: admin/admin123)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/blog-posts` | Create new post |
| PUT | `/v1/blog-posts/{id}` | Update existing post |
| DELETE | `/v1/blog-posts/{id}` | Delete post |

## 🎨 Features Showcase

### 1. Advanced Search & Filtering
- Search by keywords in title and content
- Filter by category (Programming, Backend Development, etc.)
- Tag-based filtering
- Pagination support

### 2. Interactive Blog Experience
- Click any blog post to view full content in a modal
- Real-time like functionality
- View count tracking
- Related posts suggestions
- Responsive design for all devices

### 3. Performance Features
- Caching for frequently accessed data
- Optimized database queries
- Lazy loading and pagination
- Smooth animations and transitions

### 4. Admin Features (via API)
- Create, update, and delete blog posts
- Publish/unpublish posts
- Feature posts
- Manage categories and tags

## 🔒 Security Features
- Role-based access control
- Input validation
- SQL injection prevention
- CORS configuration
- Secure endpoints

## 📱 Blog Categories Available
- Programming
- Backend Development
- Web Development
- Career
- Competitive Programming
- Technology
- Tutorials
- Personal

## 🎯 Sample Data Included
The API comes pre-loaded with 5 high-quality blog posts covering:
1. Data Structures and Algorithms
2. Spring Boot REST APIs
3. Development Journey
4. Interview Strategies
5. Database Optimization

## 🔧 Customization Options

### Adding New Posts (via API)
```bash
curl -X POST http://localhost:8080/api/v1/blog-posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YWRtaW46YWRtaW4xMjM=" \
  -d '{
    "title": "Your Blog Post Title",
    "content": "Your detailed blog content...",
    "excerpt": "Brief description...",
    "author": "Aritra",
    "category": "PROGRAMMING",
    "tags": ["Java", "Spring Boot"],
    "isPublished": true,
    "isFeatured": false
  }'
```

### Frontend Customization
- Update API base URL in `src/lib/blog-api.ts`
- Modify styling in `src/app/blog/page.tsx`
- Add new categories in the backend enum

## 🚀 Next Steps

1. **Test the functionality**: Click through the blog features
2. **Add your own content**: Use the API to create new posts
3. **Customize styling**: Adjust colors and layouts to match your brand
4. **Deploy to production**: Configure PostgreSQL and deploy both frontend and backend

## 🎉 What You Can Do Now

✅ **View all blog posts** in a beautiful, modern interface  
✅ **Search and filter** posts by various criteria  
✅ **Read full articles** in an interactive modal  
✅ **Like posts** and see real-time updates  
✅ **Navigate seamlessly** between portfolio and blog  
✅ **Admin management** via REST API  
✅ **Mobile responsive** design  
✅ **Performance optimized** with caching  

The blog is now fully functional and integrated with your portfolio! Users can click the "View All Posts" button in your portfolio's blog section to access the full blog experience.

## 🐛 Troubleshooting

### If the API doesn't start:
1. Ensure Java 17+ is installed
2. Check that port 8080 is available
3. Verify Maven is installed

### If the frontend can't connect to API:
1. Ensure the backend is running on port 8080
2. Check CORS configuration in `SecurityConfig.java`
3. Verify the API base URL in `blog-api.ts`

Enjoy your new professional blog system! 🎉