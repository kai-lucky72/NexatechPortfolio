'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
}

export function LazySection({ 
  children, 
  fallback = <div className="min-h-[200px] bg-gray-100 animate-pulse" />,
  rootMargin = '100px'
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, hasLoaded])

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}