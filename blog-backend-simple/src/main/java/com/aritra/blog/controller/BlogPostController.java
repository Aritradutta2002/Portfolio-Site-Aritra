package com.aritra.blog.controller;

import com.aritra.blog.model.BlogPost;
import com.aritra.blog.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/blog-posts")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class BlogPostController {
    
    @Autowired
    private BlogPostRepository blogPostRepository;
    
    @GetMapping
    public List<BlogPost> getAllPosts() {
        return blogPostRepository.findByIsPublishedTrueOrderByCreatedAtDesc();
    }
    
    @GetMapping("/{id}")
    public BlogPost getPostById(@PathVariable Long id) {
        Optional<BlogPost> post = blogPostRepository.findById(id);
        if (post.isPresent()) {
            BlogPost blogPost = post.get();
            blogPost.incrementViewCount();
            blogPostRepository.save(blogPost);
            return blogPost;
        }
        throw new RuntimeException("Post not found");
    }
    
    @GetMapping("/featured")
    public List<BlogPost> getFeaturedPosts() {
        return blogPostRepository.findByIsFeaturedTrueAndIsPublishedTrueOrderByCreatedAtDesc();
    }
    
    @GetMapping("/popular")
    public List<BlogPost> getPopularPosts(@RequestParam(defaultValue = "5") int limit) {
        List<BlogPost> posts = blogPostRepository.findMostPopular();
        return posts.size() > limit ? posts.subList(0, limit) : posts;
    }
    
    @GetMapping("/category/{category}")
    public List<BlogPost> getPostsByCategory(@PathVariable String category) {
        return blogPostRepository.findByCategoryAndIsPublishedTrueOrderByCreatedAtDesc(category);
    }
    
    @GetMapping("/search")
    public List<BlogPost> searchPosts(@RequestParam String keyword) {
        return blogPostRepository.searchPublishedPosts(keyword);
    }
    
    @PostMapping("/{id}/like")
    public void likePost(@PathVariable Long id) {
        Optional<BlogPost> post = blogPostRepository.findById(id);
        if (post.isPresent()) {
            BlogPost blogPost = post.get();
            blogPost.incrementLikeCount();
            blogPostRepository.save(blogPost);
        }
    }
}