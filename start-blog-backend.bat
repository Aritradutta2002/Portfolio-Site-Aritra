@echo off
echo Starting Aritra's Blog Backend API...
echo.

cd /d "%~dp0\blog-backend-simple"

echo API will be available at: http://localhost:8081/api
echo Available endpoints:
echo   GET  /v1/blog-posts           - Get all blog posts
echo   GET  /v1/blog-posts/{id}      - Get specific post
echo   GET  /v1/blog-posts/featured  - Get featured posts  
echo   GET  /v1/blog-posts/popular   - Get popular posts
echo   GET  /v1/blog-posts/category/{category} - Get posts by category
echo   GET  /v1/blog-posts/search?keyword=... - Search posts
echo   POST /v1/blog-posts/{id}/like - Like a post
echo.

mvn spring-boot:run

pause