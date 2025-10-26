package com.aritra.blog.config;

import com.aritra.blog.model.BlogCategory;
import com.aritra.blog.model.BlogPost;
import com.aritra.blog.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final BlogPostRepository blogPostRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (blogPostRepository.count() == 0) {
            System.out.println("Initializing sample blog data...");
            initializeSampleData();
            System.out.println("Sample blog data initialized successfully!");
        }
    }
    
    private void initializeSampleData() {
        List<BlogPost> samplePosts = Arrays.asList(
            BlogPost.builder()
                .title("Mastering Data Structures and Algorithms: A Competitive Programmer's Journey")
                .content(generateDetailedContent("data-structures"))
                .excerpt("My experience solving 500+ problems across LeetCode, CodeForces, and CodeChef. Key insights and strategies that helped me achieve a 1750 rating.")
                .author("Aritra")
                .category(BlogCategory.COMPETITIVE_PROGRAMMING)
                .tags(Arrays.asList("Competitive Programming", "DSA", "LeetCode", "Algorithms"))
                .isPublished(true)
                .isFeatured(true)
                .viewCount(250L)
                .likeCount(35L)
                .metaDescription("Learn advanced data structures and algorithms techniques from a competitive programmer's perspective")
                .featuredImageUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c")
                .build(),
                
            BlogPost.builder()
                .title("Building Scalable REST APIs with Spring Boot and Hibernate")
                .content(generateDetailedContent("spring-boot"))
                .excerpt("A comprehensive guide to creating enterprise-grade REST APIs using Spring Boot, covering best practices, security, and performance optimization.")
                .author("Aritra")
                .category(BlogCategory.BACKEND_DEVELOPMENT)
                .tags(Arrays.asList("Spring Boot", "Java", "REST API", "Backend", "Hibernate"))
                .isPublished(true)
                .isFeatured(true)
                .viewCount(420L)
                .likeCount(67L)
                .metaDescription("Complete guide to building production-ready REST APIs with Spring Boot 3")
                .featuredImageUrl("https://images.unsplash.com/photo-1558494949-ef010cbdcc31")
                .build(),
                
            BlogPost.builder()
                .title("From Algorithm Visualization to Production: My Development Journey")
                .content(generateDetailedContent("development-journey"))
                .excerpt("How I built an interactive algorithm visualizer and the lessons learned about clean code, user experience, and performance optimization.")
                .author("Aritra")
                .category(BlogCategory.WEB_DEVELOPMENT)
                .tags(Arrays.asList("JavaScript", "Algorithms", "Web Development", "React"))
                .isPublished(true)
                .isFeatured(false)
                .viewCount(180L)
                .likeCount(28L)
                .metaDescription("Building interactive algorithm visualizations with modern web technologies")
                .featuredImageUrl("https://images.unsplash.com/photo-1551650975-87deedd944c3")
                .build(),
                
            BlogPost.builder()
                .title("Effective Problem-Solving Strategies for Technical Interviews")
                .content(generateDetailedContent("interview-strategies"))
                .excerpt("Proven techniques and mental frameworks that helped me excel in technical interviews and competitive programming contests.")
                .author("Aritra")
                .category(BlogCategory.CAREER)
                .tags(Arrays.asList("Interview Prep", "Problem Solving", "Career", "Technical Skills"))
                .isPublished(true)
                .isFeatured(false)
                .viewCount(320L)
                .likeCount(45L)
                .metaDescription("Master technical interviews with proven problem-solving strategies and frameworks")
                .featuredImageUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3")
                .build(),
                
            BlogPost.builder()
                .title("Optimizing Database Performance in Spring Boot Applications")
                .content(generateDetailedContent("database-optimization"))
                .excerpt("Advanced techniques for database optimization including indexing strategies, query optimization, and connection pooling in Spring Boot applications.")
                .author("Aritra")
                .category(BlogCategory.BACKEND_DEVELOPMENT)
                .tags(Arrays.asList("Database", "Performance", "Spring Boot", "SQL", "Optimization"))
                .isPublished(true)
                .isFeatured(false)
                .viewCount(195L)
                .likeCount(31L)
                .metaDescription("Advanced database optimization techniques for high-performance Spring Boot applications")
                .featuredImageUrl("https://images.unsplash.com/photo-1544383835-bda2bc66a55d")
                .build()
        );
        
        // Set creation dates with some variation
        for (int i = 0; i < samplePosts.size(); i++) {
            BlogPost post = samplePosts.get(i);
            post.setCreatedAt(LocalDateTime.now().minusDays(i * 5 + 1));
            post.setUpdatedAt(post.getCreatedAt().plusHours(2));
        }
        
        blogPostRepository.saveAll(samplePosts);
    }
    
    private String generateDetailedContent(String type) {
        return switch (type) {
            case "data-structures" -> """
                # Mastering Data Structures and Algorithms
                
                ## Introduction
                
                After solving over 500 problems across various competitive programming platforms, I've learned that success in DSA isn't just about knowing the algorithms—it's about developing pattern recognition and problem-solving intuition.
                
                ## Key Learning Strategies
                
                ### 1. Pattern Recognition
                - **Two Pointers**: Master this technique for array and string problems
                - **Sliding Window**: Essential for substring and subarray problems
                - **Binary Search**: Beyond just sorted arrays—think about search spaces
                - **Dynamic Programming**: Start with 1D DP before moving to 2D
                
                ### 2. Practice Methodology
                ```java
                // Example: Two Pointers Technique
                public boolean isPalindrome(String s) {
                    int left = 0, right = s.length() - 1;
                    while (left < right) {
                        if (s.charAt(left) != s.charAt(right)) {
                            return false;
                        }
                        left++;
                        right--;
                    }
                    return true;
                }
                ```
                
                ### 3. Time Management
                - Spend 15-20 minutes thinking before coding
                - If stuck after 30 minutes, look at hints
                - Always implement the brute force solution first
                
                ## Platform Comparison
                
                | Platform | Strengths | Best For |
                |----------|-----------|----------|
                | LeetCode | Interview prep, clean UI | Getting job offers |
                | CodeForces | Contest environment | Competitive programming |
                | CodeChef | Indian community | Long challenges |
                
                ## Advanced Tips
                
                1. **Space-Time Tradeoffs**: Always consider if you can trade space for time or vice versa
                2. **Edge Cases**: Empty inputs, single elements, duplicate values
                3. **Code Quality**: Write clean, readable code even in contests
                
                ## Conclusion
                
                The journey to mastering DSA is marathon, not a sprint. Focus on understanding patterns rather than memorizing solutions. With consistent practice and the right approach, you'll see significant improvement in your problem-solving skills.
                """;
                
            case "spring-boot" -> """
                # Building Scalable REST APIs with Spring Boot
                
                ## Getting Started
                
                Spring Boot 3 brings significant improvements in performance and developer experience. This guide covers building production-ready APIs from scratch.
                
                ## Project Structure
                
                ```
                src/main/java/com/example/api/
                ├── controller/     # REST endpoints
                ├── service/        # Business logic
                ├── repository/     # Data access layer
                ├── model/          # Entity classes
                ├── dto/            # Data transfer objects
                └── config/         # Configuration classes
                ```
                
                ## Essential Dependencies
                
                ```xml
                <dependencies>
                    <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-web</artifactId>
                    </dependency>
                    <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-data-jpa</artifactId>
                    </dependency>
                    <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-validation</artifactId>
                    </dependency>
                </dependencies>
                ```
                
                ## Best Practices
                
                ### 1. Controller Layer
                ```java
                @RestController
                @RequestMapping("/api/v1/users")
                @Validated
                public class UserController {
                    
                    @GetMapping("/{id}")
                    public ResponseEntity<UserDTO> getUser(@PathVariable @Min(1) Long id) {
                        UserDTO user = userService.findById(id);
                        return ResponseEntity.ok(user);
                    }
                }
                ```
                
                ### 2. Service Layer
                - Keep business logic in services
                - Use @Transactional for data modifications
                - Implement proper exception handling
                
                ### 3. Repository Layer
                - Extend JpaRepository for basic operations
                - Use @Query for complex queries
                - Implement custom repositories when needed
                
                ## Performance Optimization
                
                1. **Caching**: Use @Cacheable for frequently accessed data
                2. **Pagination**: Always paginate large datasets
                3. **N+1 Problem**: Use @EntityGraph or JOIN FETCH
                4. **Connection Pooling**: Configure HikariCP properly
                
                ## Security Considerations
                
                - Input validation with Bean Validation
                - SQL injection prevention with parameterized queries
                - Authentication and authorization with Spring Security
                - Rate limiting for API endpoints
                
                This foundation will help you build robust, scalable APIs that can handle production workloads effectively.
                """;
                
            default -> """
                # Blog Post Content
                
                This is a comprehensive blog post that covers various aspects of software development, 
                best practices, and real-world experiences. The content provides valuable insights 
                for developers at all levels.
                
                ## Key Takeaways
                
                - Focus on fundamentals
                - Practice consistently
                - Learn from failures
                - Build projects
                - Share knowledge
                
                ## Conclusion
                
                Continuous learning and practical application are the keys to growth in software development.
                """;
        };
    }
}