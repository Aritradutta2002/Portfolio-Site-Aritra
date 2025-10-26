package com.aritra.blog.dto;

import com.aritra.blog.model.BlogCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostCreateDTO {
    
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must be less than 200 characters")
    private String title;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    @Size(max = 500, message = "Excerpt must be less than 500 characters")
    private String excerpt;
    
    @NotBlank(message = "Author is required")
    @Size(max = 100, message = "Author must be less than 100 characters")
    private String author;
    
    @Builder.Default
    private List<String> tags = new ArrayList<>();
    
    @NotNull(message = "Category is required")
    private BlogCategory category;
    
    @Size(max = 300, message = "Meta description must be less than 300 characters")
    private String metaDescription;
    
    private String featuredImageUrl;
    
    @Builder.Default
    private Boolean isPublished = false;
    
    @Builder.Default
    private Boolean isFeatured = false;
}