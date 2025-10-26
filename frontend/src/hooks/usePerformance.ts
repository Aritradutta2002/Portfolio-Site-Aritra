'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const measurePerformance = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        const newMetrics: Partial<PerformanceMetrics> = {}

        // Load time
        if (navigation) {
          newMetrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart
        }

        // First Contentful Paint
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint')
        if (fcp) {
          newMetrics.firstContentfulPaint = fcp.startTime
        }

        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            if (lastEntry) {
              setMetrics(prev => ({
                ...prev,
                largestContentfulPaint: lastEntry.startTime
              }))
            }
          })
          
          try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
          } catch {
            console.warn('LCP observation not supported')
          }

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0
            for (const entry of list.getEntries()) {
              const layoutShiftEntry = entry as PerformanceEntry & {
                hadRecentInput?: boolean
                value?: number
              }
              if (!layoutShiftEntry.hadRecentInput) {
                clsValue += layoutShiftEntry.value || 0
              }
            }
            setMetrics(prev => ({
              ...prev,
              cumulativeLayoutShift: clsValue
            }))
          })

          try {
            clsObserver.observe({ entryTypes: ['layout-shift'] })
          } catch {
            console.warn('CLS observation not supported')
          }

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fidEntry = entry as PerformanceEntry & {
                processingStart?: number
              }
              setMetrics(prev => ({
                ...prev,
                firstInputDelay: (fidEntry.processingStart || 0) - entry.startTime
              }))
            }
          })

          try {
            fidObserver.observe({ entryTypes: ['first-input'] })
          } catch {
            console.warn('FID observation not supported')
          }
        }

        setMetrics(prev => ({ ...prev, ...newMetrics }))
        setIsLoading(false)
      } catch (error) {
        console.error('Performance measurement error:', error)
        setIsLoading(false)
      }
    }

    // Wait for page load
    if (document.readyState === 'complete') {
      measurePerformance()
    } else {
      window.addEventListener('load', measurePerformance)
      return () => window.removeEventListener('load', measurePerformance)
    }
  }, [])

  return { metrics, isLoading }
}

// Hook for monitoring component render performance
export function useRenderPerformance(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now()
      
      return () => {
        const endTime = performance.now()
        const renderTime = endTime - startTime
        
        if (renderTime > 16) { // More than one frame (16ms at 60fps)
          console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`)
        }
      }
    }
  })
}

// Hook for lazy loading images
export function useLazyImage(src: string, options?: IntersectionObserverInit) {
  const [imageSrc, setImageSrc] = useState<string>()
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!imageRef || !('IntersectionObserver' in window)) {
      setImageSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(imageRef)

    return () => {
      if (imageRef) {
        observer.unobserve(imageRef)
      }
    }
  }, [imageRef, src, options])

  return [imageSrc, setImageRef] as const
}
