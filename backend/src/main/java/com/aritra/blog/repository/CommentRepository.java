package com.aritra.blog.repository;

import com.aritra.blog.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    // Find approved comments for a blog post
    List<Comment> findByBlogPostIdAndIsApprovedTrueOrderByCreatedAtDesc(Long blogPostId);
    
    // Find all comments for a blog post (admin only)
    Page<Comment> findByBlogPostIdOrderByCreatedAtDesc(Long blogPostId, Pageable pageable);
    
    // Find pending comments (admin only)
    Page<Comment> findByIsApprovedFalseOrderByCreatedAtDesc(Pageable pageable);
    
    // Count approved comments for a blog post
    long countByBlogPostIdAndIsApprovedTrue(Long blogPostId);
    
    // Count pending comments
    long countByIsApprovedFalse();
    
    // Find recent comments
    @Query("SELECT c FROM Comment c WHERE c.isApproved = true ORDER BY c.createdAt DESC")
    List<Comment> findRecentApprovedComments(Pageable pageable);
}