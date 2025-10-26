package com.aritra.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blog_posts")
@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class BlogPost {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must be less than 200 characters")
    @Column(nullable = false, length = 200)
    private String title;
    
    @NotBlank(message = "Content is required")
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Size(max = 500, message = "Excerpt must be less than 500 characters")
    @Column(length = 500)
    private String excerpt;
    
    @NotBlank(message = "Author is required")
    @Column(nullable = false, length = 100)
    private String author;
    
    @Builder.Default
    @Column(name = "view_count")
    private Long viewCount = 0L;
    
    @Builder.Default
    @Column(name = "like_count")
    private Long likeCount = 0L;
    
    @Builder.Default
    @Column(name = "is_published")
    private Boolean isPublished = false;
    
    @Builder.Default
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @Column(name = "read_time")
    private Integer readTime; // in minutes
    
    @ElementCollection
    @CollectionTable(name = "blog_post_tags", joinColumns = @JoinColumn(name = "blog_post_id"))
    @Column(name = "tag")
    @Builder.Default
    private List<String> tags = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Category is required")
    private BlogCategory category;
    
    @Column(name = "meta_description")
    private String metaDescription;
    
    @Column(name = "featured_image_url")
    private String featuredImageUrl;
    
    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    @Builder.Default
    private List<Comment> comments = new ArrayList<>();
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    private void prePersist() {
        if (readTime == null && content != null) {
            // Calculate read time (average 200 words per minute)
            int wordCount = content.split("\\s+").length;
            readTime = Math.max(1, wordCount / 200);
        }
        if (excerpt == null && content != null) {
            // Auto-generate excerpt from content
            excerpt = content.length() > 200 ? 
                content.substring(0, 200) + "..." : content;
        }
    }
    
    public void incrementViewCount() {
        this.viewCount = this.viewCount == null ? 1 : this.viewCount + 1;
    }
    
    public void incrementLikeCount() {
        this.likeCount = this.likeCount == null ? 1 : this.likeCount + 1;
    }
    
    public void decrementLikeCount() {
        this.likeCount = this.likeCount == null || this.likeCount <= 0 ? 0 : this.likeCount - 1;
    }
}