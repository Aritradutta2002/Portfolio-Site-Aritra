package com.aritra.blog.dto;

import com.aritra.blog.model.BlogCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostResponseDTO {
    private Long id;
    private String title;
    private String content;
    private String excerpt;
    private String author;
    private Long viewCount;
    private Long likeCount;
    private Integer readTime;
    private List<String> tags;
    private BlogCategory category;
    private String metaDescription;
    private String featuredImageUrl;
    private Boolean isFeatured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}