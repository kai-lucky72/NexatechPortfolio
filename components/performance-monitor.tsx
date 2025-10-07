'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
          }
        }
      })
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        // Browser doesn't support this API
      }

      // First Input Delay (FID) and Cumulative Layout Shift (CLS)
      const webVitalsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`${entry.entryType}:`, entry)
        }
      })

      try {
        webVitalsObserver.observe({ entryTypes: ['first-input', 'layout-shift'] })
      } catch (e) {
        // Browser doesn't support this API
      }

      return () => {
        observer.disconnect()
        webVitalsObserver.disconnect()
      }
    }
  }, [])

  return null
}