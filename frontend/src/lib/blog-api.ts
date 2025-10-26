// API utility functions for blog
const API_BASE = 'http://localhost:8081/api/v1/blog-posts'

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  viewCount: number
  likeCount: number
  readTime: number
  tags: string[]
  category: string
  featuredImageUrl?: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface ApiResponse {
  content: BlogPost[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export const blogApi = {
  async getAllPosts(page = 0, size = 10): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}?page=${page}&size=${size}`)
    if (!response.ok) throw new Error('Failed to fetch posts')
    return response.json()
  },

  async getPostById(id: number): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/${id}`)
    if (!response.ok) throw new Error('Failed to fetch post')
    return response.json()
  },

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE}/featured`)
    if (!response.ok) throw new Error('Failed to fetch featured posts')
    return response.json()
  },

  async getPopularPosts(limit = 5): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE}/popular?limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch popular posts')
    return response.json()
  },

  async getRecentPosts(days = 30, limit = 10): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE}/recent?days=${days}&limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch recent posts')
    return response.json()
  },

  async getPostsByCategory(category: string, page = 0, size = 10): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}/category/${category}?page=${page}&size=${size}`)
    if (!response.ok) throw new Error('Failed to fetch posts by category')
    return response.json()
  },

  async searchPosts(keyword: string, page = 0, size = 10): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`)
    if (!response.ok) throw new Error('Failed to search posts')
    return response.json()
  },

  async getPostsByTag(tag: string, page = 0, size = 10): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}/tag/${tag}?page=${page}&size=${size}`)
    if (!response.ok) throw new Error('Failed to fetch posts by tag')
    return response.json()
  },

  async getRelatedPosts(id: number, limit = 5): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE}/${id}/related?limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch related posts')
    return response.json()
  },

  async likePost(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}/like`, { method: 'POST' })
    if (!response.ok) throw new Error('Failed to like post')
  }
}