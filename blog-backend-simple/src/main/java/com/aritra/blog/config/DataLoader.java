package com.aritra.blog.config;

import com.aritra.blog.model.BlogPost;
import com.aritra.blog.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private BlogPostRepository blogPostRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (blogPostRepository.count() == 0) {
            System.out.println("Loading sample blog data...");
            
            BlogPost post1 = new BlogPost(
                "Mastering Data Structures and Algorithms",
                "# Mastering Data Structures and Algorithms\n\nAfter solving over 500 problems across various competitive programming platforms, I've learned that success in DSA isn't just about knowing the algorithms—it's about developing pattern recognition and problem-solving intuition.\n\n## Key Learning Strategies\n\n### 1. Pattern Recognition\n- **Two Pointers**: Master this technique for array and string problems\n- **Sliding Window**: Essential for substring and subarray problems\n- **Binary Search**: Beyond just sorted arrays—think about search spaces\n- **Dynamic Programming**: Start with 1D DP before moving to 2D\n\n### 2. Practice Methodology\n```java\n// Example: Two Pointers Technique\npublic boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        if (s.charAt(left) != s.charAt(right)) {\n            return false;\n        }\n        left++;\n        right--;\n    }\n    return true;\n}\n```",
                "My experience solving 500+ problems across LeetCode, CodeForces, and CodeChef. Key insights and strategies that helped me achieve a 1750 rating.",
                "Aritra",
                "COMPETITIVE_PROGRAMMING"
            );
            post1.setTags(Arrays.asList("Competitive Programming", "DSA", "LeetCode", "Algorithms"));
            post1.setIsFeatured(true);
            post1.setViewCount(250L);
            post1.setLikeCount(35L);
            post1.setReadTime(8);
            post1.setFeaturedImageUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c");
            
            BlogPost post2 = new BlogPost(
                "Building Scalable REST APIs with Spring Boot",
                "# Building Scalable REST APIs with Spring Boot\n\nSpring Boot 3 brings significant improvements in performance and developer experience. This guide covers building production-ready APIs from scratch.\n\n## Project Structure\n\n```\nsrc/main/java/com/example/api/\n├── controller/     # REST endpoints\n├── service/        # Business logic\n├── repository/     # Data access layer\n├── model/          # Entity classes\n└── config/         # Configuration classes\n```\n\n## Best Practices\n\n### 1. Controller Layer\n```java\n@RestController\n@RequestMapping(\"/api/v1/users\")\n@Validated\npublic class UserController {\n    \n    @GetMapping(\"/{id}\")\n    public ResponseEntity<UserDTO> getUser(@PathVariable @Min(1) Long id) {\n        UserDTO user = userService.findById(id);\n        return ResponseEntity.ok(user);\n    }\n}\n```",
                "A comprehensive guide to creating enterprise-grade REST APIs using Spring Boot, covering best practices, security, and performance optimization.",
                "Aritra",
                "BACKEND_DEVELOPMENT"
            );
            post2.setTags(Arrays.asList("Spring Boot", "Java", "REST API", "Backend", "Hibernate"));
            post2.setIsFeatured(true);
            post2.setViewCount(420L);
            post2.setLikeCount(67L);
            post2.setReadTime(12);
            post2.setFeaturedImageUrl("https://images.unsplash.com/photo-1558494949-ef010cbdcc31");
            
            BlogPost post3 = new BlogPost(
                "Algorithm Visualization Development Journey",
                "# From Algorithm Visualization to Production\n\nBuilding an interactive algorithm visualizer taught me valuable lessons about clean code, user experience, and performance optimization.\n\n## Technologies Used\n- React for the frontend\n- Canvas API for animations\n- TypeScript for type safety\n- Custom algorithms implementation\n\n## Key Learnings\n1. **Performance Optimization**: Learned about efficient rendering techniques\n2. **User Experience**: Importance of intuitive interfaces\n3. **Code Architecture**: Clean, maintainable code structure",
                "How I built an interactive algorithm visualizer and the lessons learned about clean code, user experience, and performance optimization.",
                "Aritra",
                "WEB_DEVELOPMENT"
            );
            post3.setTags(Arrays.asList("JavaScript", "Algorithms", "Web Development", "React"));
            post3.setViewCount(180L);
            post3.setLikeCount(28L);
            post3.setReadTime(6);
            post3.setFeaturedImageUrl("https://images.unsplash.com/photo-1551650975-87deedd944c3");
            
            BlogPost post4 = new BlogPost(
                "Technical Interview Problem-Solving Strategies",
                "# Effective Problem-Solving Strategies for Technical Interviews\n\nProven techniques and mental frameworks that helped me excel in technical interviews and competitive programming contests.\n\n## Key Strategies\n\n### 1. Understanding the Problem\n- Read the problem statement carefully\n- Ask clarifying questions\n- Identify edge cases\n- Think about constraints\n\n### 2. Planning Your Approach\n- Start with brute force\n- Optimize step by step\n- Consider time and space complexity\n- Think about different data structures\n\n### 3. Implementation Tips\n- Write clean, readable code\n- Use meaningful variable names\n- Handle edge cases\n- Test your solution",
                "Proven techniques and mental frameworks that helped me excel in technical interviews and competitive programming contests.",
                "Aritra",
                "CAREER"
            );
            post4.setTags(Arrays.asList("Interview Prep", "Problem Solving", "Career", "Technical Skills"));
            post4.setViewCount(320L);
            post4.setLikeCount(45L);
            post4.setReadTime(10);
            post4.setFeaturedImageUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3");
            
            BlogPost post5 = new BlogPost(
                "Database Performance Optimization in Spring Boot",
                "# Optimizing Database Performance in Spring Boot Applications\n\nAdvanced techniques for database optimization including indexing strategies, query optimization, and connection pooling.\n\n## Key Optimization Techniques\n\n### 1. Query Optimization\n- Use proper indexing\n- Avoid N+1 problems\n- Use JPQL efficiently\n- Implement pagination\n\n### 2. Connection Pooling\n- Configure HikariCP properly\n- Monitor connection usage\n- Set appropriate timeouts\n\n### 3. Caching Strategies\n- Implement Redis caching\n- Use Spring Cache abstraction\n- Cache at different levels",
                "Advanced techniques for database optimization including indexing strategies, query optimization, and connection pooling in Spring Boot applications.",
                "Aritra",
                "BACKEND_DEVELOPMENT"
            );
            post5.setTags(Arrays.asList("Database", "Performance", "Spring Boot", "SQL", "Optimization"));
            post5.setViewCount(195L);
            post5.setLikeCount(31L);
            post5.setReadTime(9);
            post5.setFeaturedImageUrl("https://images.unsplash.com/photo-1544383835-bda2bc66a55d");
            
            blogPostRepository.saveAll(Arrays.asList(post1, post2, post3, post4, post5));
            System.out.println("Sample blog data loaded successfully!");
        }
    }
}