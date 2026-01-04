'use client'

import { useEffect } from 'react'

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') {
      return
    }

    // Load GA script after page is fully loaded
    const loadGA = () => {
      // Check if script already exists
      if (document.querySelector(`script[src*="gtag/js?id=${gaId}"]`)) {
        return
      }

      // Load gtag.js script (async, after page load for performance)
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)
      
      // Note: gtag('js', new Date()) and gtag('config') are already in head
      // They will execute when gtag.js loads
    }

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      loadGA()
    } else {
      window.addEventListener('load', loadGA)
      return () => window.removeEventListener('load', loadGA)
    }
  }, [gaId])

  // This component doesn't render anything visible
  // It only loads GA script after page load via useEffect
  return null
}

