package com.aritra.blog.service;

import com.aritra.blog.dto.BlogPostCreateDTO;
import com.aritra.blog.dto.BlogPostResponseDTO;
import com.aritra.blog.dto.BlogPostUpdateDTO;
import com.aritra.blog.exception.ResourceNotFoundException;
import com.aritra.blog.model.BlogCategory;
import com.aritra.blog.model.BlogPost;
import com.aritra.blog.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BlogPostService {
    
    private final BlogPostRepository blogPostRepository;
    
    @Cacheable(value = "blogPosts", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<BlogPostResponseDTO> getAllPublishedPosts(Pageable pageable) {
        return blogPostRepository.findByIsPublishedTrueOrderByCreatedAtDesc(pageable)
                .map(this::convertToResponseDTO);
    }
    
    @Cacheable(value = "blogPost", key = "#id")
    @Transactional
    public BlogPostResponseDTO getPublishedPostById(Long id) {
        BlogPost post = blogPostRepository.findByIdAndIsPublishedTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
        
        // Increment view count
        post.incrementViewCount();
        blogPostRepository.save(post);
        
        return convertToResponseDTO(post);
    }
    
    @Cacheable(value = "featuredPosts")
    public List<BlogPostResponseDTO> getFeaturedPosts() {
        return blogPostRepository.findByIsFeaturedTrueAndIsPublishedTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public Page<BlogPostResponseDTO> getPostsByCategory(BlogCategory category, Pageable pageable) {
        return blogPostRepository.findByCategoryAndIsPublishedTrueOrderByCreatedAtDesc(category, pageable)
                .map(this::convertToResponseDTO);
    }
    
    public Page<BlogPostResponseDTO> searchPosts(String keyword, Pageable pageable) {
        return blogPostRepository.searchPublishedPosts(keyword, pageable)
                .map(this::convertToResponseDTO);
    }
    
    public Page<BlogPostResponseDTO> getPostsByTag(String tag, Pageable pageable) {
        return blogPostRepository.findByTagsContainingIgnoreCase(tag, pageable)
                .map(this::convertToResponseDTO);
    }
    
    @Cacheable(value = "popularPosts")
    public List<BlogPostResponseDTO> getMostPopularPosts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return blogPostRepository.findMostPopular(pageable)
                .getContent()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Cacheable(value = "recentPosts")
    public List<BlogPostResponseDTO> getRecentPosts(int days, int limit) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        return blogPostRepository.findRecentPosts(startDate)
                .stream()
                .limit(limit)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public List<BlogPostResponseDTO> getRelatedPosts(Long currentPostId, int limit) {
        BlogPost currentPost = blogPostRepository.findById(currentPostId)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found"));
        
        Pageable pageable = PageRequest.of(0, limit);
        return blogPostRepository.findRelatedPosts(
                currentPostId, 
                currentPost.getCategory(), 
                currentPost.getTags(), 
                pageable
        ).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    @CacheEvict(value = {"blogPosts", "featuredPosts", "popularPosts", "recentPosts"}, allEntries = true)
    public BlogPostResponseDTO createPost(BlogPostCreateDTO createDTO) {
        BlogPost post = BlogPost.builder()
                .title(createDTO.getTitle())
                .content(createDTO.getContent())
                .excerpt(createDTO.getExcerpt())
                .author(createDTO.getAuthor())
                .category(createDTO.getCategory())
                .tags(createDTO.getTags())
                .isPublished(createDTO.getIsPublished())
                .isFeatured(createDTO.getIsFeatured())
                .metaDescription(createDTO.getMetaDescription())
                .featuredImageUrl(createDTO.getFeaturedImageUrl())
                .build();
        
        BlogPost savedPost = blogPostRepository.save(post);
        return convertToResponseDTO(savedPost);
    }
    
    @Transactional
    @CacheEvict(value = {"blogPost", "blogPosts", "featuredPosts", "popularPosts", "recentPosts"}, allEntries = true)
    public BlogPostResponseDTO updatePost(Long id, BlogPostUpdateDTO updateDTO) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
        
        if (updateDTO.getTitle() != null) post.setTitle(updateDTO.getTitle());
        if (updateDTO.getContent() != null) post.setContent(updateDTO.getContent());
        if (updateDTO.getExcerpt() != null) post.setExcerpt(updateDTO.getExcerpt());
        if (updateDTO.getCategory() != null) post.setCategory(updateDTO.getCategory());
        if (updateDTO.getTags() != null) post.setTags(updateDTO.getTags());
        if (updateDTO.getIsPublished() != null) post.setIsPublished(updateDTO.getIsPublished());
        if (updateDTO.getIsFeatured() != null) post.setIsFeatured(updateDTO.getIsFeatured());
        if (updateDTO.getMetaDescription() != null) post.setMetaDescription(updateDTO.getMetaDescription());
        if (updateDTO.getFeaturedImageUrl() != null) post.setFeaturedImageUrl(updateDTO.getFeaturedImageUrl());
        
        BlogPost updatedPost = blogPostRepository.save(post);
        return convertToResponseDTO(updatedPost);
    }
    
    @Transactional
    @CacheEvict(value = {"blogPost", "blogPosts", "featuredPosts", "popularPosts", "recentPosts"}, allEntries = true)
    public void deletePost(Long id) {
        if (!blogPostRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog post not found with id: " + id);
        }
        blogPostRepository.deleteById(id);
    }
    
    @Transactional
    @CacheEvict(value = "blogPost", key = "#id")
    public void toggleLike(Long id) {
        BlogPost post = blogPostRepository.findByIdAndIsPublishedTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
        
        post.incrementLikeCount();
        blogPostRepository.save(post);
    }
    
    private BlogPostResponseDTO convertToResponseDTO(BlogPost post) {
        return BlogPostResponseDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .excerpt(post.getExcerpt())
                .author(post.getAuthor())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .readTime(post.getReadTime())
                .tags(post.getTags())
                .category(post.getCategory())
                .metaDescription(post.getMetaDescription())
                .featuredImageUrl(post.getFeaturedImageUrl())
                .isFeatured(post.getIsFeatured())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}