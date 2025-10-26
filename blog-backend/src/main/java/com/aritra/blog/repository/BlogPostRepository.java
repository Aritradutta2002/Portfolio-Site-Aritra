package com.aritra.blog.repository;

import com.aritra.blog.model.BlogCategory;
import com.aritra.blog.model.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    // Find published posts
    Page<BlogPost> findByIsPublishedTrueOrderByCreatedAtDesc(Pageable pageable);
    
    // Find featured posts
    List<BlogPost> findByIsFeaturedTrueAndIsPublishedTrueOrderByCreatedAtDesc();
    
    // Find by category
    Page<BlogPost> findByCategoryAndIsPublishedTrueOrderByCreatedAtDesc(BlogCategory category, Pageable pageable);
    
    // Find by author
    Page<BlogPost> findByAuthorAndIsPublishedTrueOrderByCreatedAtDesc(String author, Pageable pageable);
    
    // Search functionality
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isPublished = true AND " +
           "(LOWER(bp.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(bp.content) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(bp.excerpt) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY bp.createdAt DESC")
    Page<BlogPost> searchPublishedPosts(@Param("keyword") String keyword, Pageable pageable);
    
    // Find by tags
    @Query("SELECT bp FROM BlogPost bp JOIN bp.tags t WHERE bp.isPublished = true AND " +
           "LOWER(t) LIKE LOWER(CONCAT('%', :tag, '%')) ORDER BY bp.createdAt DESC")
    Page<BlogPost> findByTagsContainingIgnoreCase(@Param("tag") String tag, Pageable pageable);
    
    // Most popular posts (by view count)
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isPublished = true " +
           "ORDER BY bp.viewCount DESC, bp.createdAt DESC")
    Page<BlogPost> findMostPopular(Pageable pageable);
    
    // Most liked posts
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isPublished = true " +
           "ORDER BY bp.likeCount DESC, bp.createdAt DESC")
    Page<BlogPost> findMostLiked(Pageable pageable);
    
    // Recent posts within date range
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isPublished = true AND " +
           "bp.createdAt >= :startDate ORDER BY bp.createdAt DESC")
    List<BlogPost> findRecentPosts(@Param("startDate") LocalDateTime startDate);
    
    // Related posts by category and tags
    @Query("SELECT DISTINCT bp FROM BlogPost bp JOIN bp.tags t WHERE bp.isPublished = true AND " +
           "bp.id != :currentId AND (bp.category = :category OR t IN :tags) " +
           "ORDER BY bp.createdAt DESC")
    List<BlogPost> findRelatedPosts(@Param("currentId") Long currentId, 
                                   @Param("category") BlogCategory category, 
                                   @Param("tags") List<String> tags, 
                                   Pageable pageable);
    
    // Count posts by category
    long countByCategoryAndIsPublishedTrue(BlogCategory category);
    
    // Find published post by id
    Optional<BlogPost> findByIdAndIsPublishedTrue(Long id);
}