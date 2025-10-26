package com.aritra.blog.dto;

import com.aritra.blog.model.BlogCategory;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostUpdateDTO {
    
    @Size(max = 200, message = "Title must be less than 200 characters")
    private String title;
    
    private String content;
    
    @Size(max = 500, message = "Excerpt must be less than 500 characters")
    private String excerpt;
    
    private List<String> tags;
    
    private BlogCategory category;
    
    @Size(max = 300, message = "Meta description must be less than 300 characters")
    private String metaDescription;
    
    private String featuredImageUrl;
    
    private Boolean isPublished;
    
    private Boolean isFeatured;
}