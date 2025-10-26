package com.aritra.blog.repository;

import com.aritra.blog.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    List<BlogPost> findByIsPublishedTrueOrderByCreatedAtDesc();
    
    List<BlogPost> findByIsFeaturedTrueAndIsPublishedTrueOrderByCreatedAtDesc();
    
    List<BlogPost> findByCategoryAndIsPublishedTrueOrderByCreatedAtDesc(String category);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isPublished = true AND " +
           "(LOWER(bp.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(bp.content) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY bp.createdAt DESC")
    List<BlogPost> searchPublishedPosts(@Param("keyword") String keyword);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isPublished = true " +
           "ORDER BY bp.viewCount DESC, bp.createdAt DESC")
    List<BlogPost> findMostPopular();
}