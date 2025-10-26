package com.aritra.blog.controller;

import com.aritra.blog.dto.BlogPostCreateDTO;
import com.aritra.blog.dto.BlogPostResponseDTO;
import com.aritra.blog.dto.BlogPostUpdateDTO;
import com.aritra.blog.model.BlogCategory;
import com.aritra.blog.service.BlogPostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/blog-posts")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Blog Posts", description = "Blog post management API")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class BlogPostController {
    
    private final BlogPostService blogPostService;
    
    @GetMapping
    @Operation(summary = "Get all published blog posts", description = "Retrieve paginated list of published blog posts")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved blog posts"),
        @ApiResponse(responseCode = "400", description = "Invalid pagination parameters")
    })
    public ResponseEntity<Page<BlogPostResponseDTO>> getAllPosts(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        log.info("GET /blog-posts - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<BlogPostResponseDTO> posts = blogPostService.getAllPublishedPosts(pageable);
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get blog post by ID", description = "Retrieve a specific published blog post by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved blog post"),
        @ApiResponse(responseCode = "404", description = "Blog post not found")
    })
    public ResponseEntity<BlogPostResponseDTO> getPostById(
            @Parameter(description = "Blog post ID") @PathVariable Long id) {
        
        log.info("GET /blog-posts/{}", id);
        BlogPostResponseDTO post = blogPostService.getPublishedPostById(id);
        return ResponseEntity.ok(post);
    }
    
    @GetMapping("/featured")
    @Operation(summary = "Get featured blog posts", description = "Retrieve all featured blog posts")
    public ResponseEntity<List<BlogPostResponseDTO>> getFeaturedPosts() {
        log.info("GET /blog-posts/featured");
        List<BlogPostResponseDTO> posts = blogPostService.getFeaturedPosts();
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/popular")
    @Operation(summary = "Get most popular blog posts", description = "Retrieve most popular blog posts by view count")
    public ResponseEntity<List<BlogPostResponseDTO>> getPopularPosts(
            @Parameter(description = "Number of posts to return") @RequestParam(defaultValue = "5") int limit) {
        
        log.info("GET /blog-posts/popular - limit: {}", limit);
        List<BlogPostResponseDTO> posts = blogPostService.getMostPopularPosts(limit);
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/recent")
    @Operation(summary = "Get recent blog posts", description = "Retrieve recent blog posts within specified days")
    public ResponseEntity<List<BlogPostResponseDTO>> getRecentPosts(
            @Parameter(description = "Number of days to look back") @RequestParam(defaultValue = "30") int days,
            @Parameter(description = "Number of posts to return") @RequestParam(defaultValue = "10") int limit) {
        
        log.info("GET /blog-posts/recent - days: {}, limit: {}", days, limit);
        List<BlogPostResponseDTO> posts = blogPostService.getRecentPosts(days, limit);
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/category/{category}")
    @Operation(summary = "Get blog posts by category", description = "Retrieve blog posts filtered by category")
    public ResponseEntity<Page<BlogPostResponseDTO>> getPostsByCategory(
            @Parameter(description = "Blog category") @PathVariable BlogCategory category,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        log.info("GET /blog-posts/category/{} - page: {}, size: {}", category, page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<BlogPostResponseDTO> posts = blogPostService.getPostsByCategory(category, pageable);
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search blog posts", description = "Search blog posts by keyword in title and content")
    public ResponseEntity<Page<BlogPostResponseDTO>> searchPosts(
            @Parameter(description = "Search keyword") @RequestParam String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        log.info("GET /blog-posts/search - keyword: {}, page: {}, size: {}", keyword, page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<BlogPostResponseDTO> posts = blogPostService.searchPosts(keyword, pageable);
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/tag/{tag}")
    @Operation(summary = "Get blog posts by tag", description = "Retrieve blog posts filtered by tag")
    public ResponseEntity<Page<BlogPostResponseDTO>> getPostsByTag(
            @Parameter(description = "Tag name") @PathVariable String tag,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        log.info("GET /blog-posts/tag/{} - page: {}, size: {}", tag, page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<BlogPostResponseDTO> posts = blogPostService.getPostsByTag(tag, pageable);
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/{id}/related")
    @Operation(summary = "Get related blog posts", description = "Retrieve blog posts related to the specified post")
    public ResponseEntity<List<BlogPostResponseDTO>> getRelatedPosts(
            @Parameter(description = "Blog post ID") @PathVariable Long id,
            @Parameter(description = "Number of related posts to return") @RequestParam(defaultValue = "5") int limit) {
        
        log.info("GET /blog-posts/{}/related - limit: {}", id, limit);
        List<BlogPostResponseDTO> posts = blogPostService.getRelatedPosts(id, limit);
        return ResponseEntity.ok(posts);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create new blog post", description = "Create a new blog post (Admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Blog post created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<BlogPostResponseDTO> createPost(@Valid @RequestBody BlogPostCreateDTO createDTO) {
        log.info("POST /blog-posts - title: {}", createDTO.getTitle());
        BlogPostResponseDTO createdPost = blogPostService.createPost(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update blog post", description = "Update an existing blog post (Admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Blog post updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "403", description = "Access denied"),
        @ApiResponse(responseCode = "404", description = "Blog post not found")
    })
    public ResponseEntity<BlogPostResponseDTO> updatePost(
            @Parameter(description = "Blog post ID") @PathVariable Long id,
            @Valid @RequestBody BlogPostUpdateDTO updateDTO) {
        
        log.info("PUT /blog-posts/{}", id);
        BlogPostResponseDTO updatedPost = blogPostService.updatePost(id, updateDTO);
        return ResponseEntity.ok(updatedPost);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete blog post", description = "Delete a blog post (Admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Blog post deleted successfully"),
        @ApiResponse(responseCode = "403", description = "Access denied"),
        @ApiResponse(responseCode = "404", description = "Blog post not found")
    })
    public ResponseEntity<Void> deletePost(@Parameter(description = "Blog post ID") @PathVariable Long id) {
        log.info("DELETE /blog-posts/{}", id);
        blogPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/like")
    @Operation(summary = "Like a blog post", description = "Increment like count for a blog post")
    public ResponseEntity<Void> likePost(@Parameter(description = "Blog post ID") @PathVariable Long id) {
        log.info("POST /blog-posts/{}/like", id);
        blogPostService.toggleLike(id);
        return ResponseEntity.ok().build();
    }
}