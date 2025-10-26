# Aritra's Portfolio Blog API

A comprehensive Spring Boot 3 REST API for blog management with advanced features.

## Features

- **CRUD Operations**: Complete blog post management
- **Advanced Search**: Search by keyword, category, tags
- **Caching**: Redis-like caching for performance
- **Security**: Role-based access control
- **Documentation**: OpenAPI 3.0 with Swagger UI
- **Validation**: Input validation with Bean Validation
- **Exception Handling**: Global exception handling
- **Database**: JPA with Hibernate, H2 for development

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+

### Running the Application

1. Clone the repository
2. Navigate to the blog-backend directory
3. Run the application:

```bash
cd blog-backend
mvn spring-boot:run
```

The API will be available at: http://localhost:8080/api

### API Documentation

Once running, visit:
- Swagger UI: http://localhost:8080/api/swagger-ui.html
- API Docs: http://localhost:8080/api/v3/api-docs
- H2 Console: http://localhost:8080/api/h2-console

### Authentication

For admin operations, use Basic Auth:
- Username: `admin`
- Password: `admin123`

## API Endpoints

### Public Endpoints

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

### Admin Endpoints (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/blog-posts` | Create new post |
| PUT | `/v1/blog-posts/{id}` | Update existing post |
| DELETE | `/v1/blog-posts/{id}` | Delete post |

## Configuration

### Application Properties

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:blogdb
    username: sa
    password: password
  
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true

server:
  port: 8080
  servlet:
    context-path: /api
```

### CORS Configuration

The API is configured to accept requests from:
- http://localhost:3000 (Next.js dev server)
- http://localhost:3001 (Alternative dev port)

## Sample Data

The application initializes with sample blog posts on startup, including:
- Data Structures and Algorithms content
- Spring Boot tutorials
- Development journey stories
- Interview preparation guides

## Technologies Used

- **Spring Boot 3.2.2**
- **Spring Data JPA**
- **Spring Security**
- **H2 Database** (development)
- **PostgreSQL** (production ready)
- **OpenAPI 3.0** (Swagger)
- **Lombok**
- **Bean Validation**
- **Spring Cache**

## Production Deployment

For production deployment:

1. Configure PostgreSQL database
2. Update CORS origins
3. Set up proper security credentials
4. Configure caching (Redis)
5. Add monitoring and logging

## License

MIT License