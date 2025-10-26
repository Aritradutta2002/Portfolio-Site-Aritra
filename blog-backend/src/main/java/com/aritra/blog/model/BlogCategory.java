package com.aritra.blog.model;

public enum BlogCategory {
    PROGRAMMING("Programming"),
    BACKEND_DEVELOPMENT("Backend Development"),
    WEB_DEVELOPMENT("Web Development"),
    CAREER("Career"),
    TECHNOLOGY("Technology"),
    TUTORIALS("Tutorials"),
    COMPETITIVE_PROGRAMMING("Competitive Programming"),
    PERSONAL("Personal");
    
    private final String displayName;
    
    BlogCategory(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}