'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

export function SEOIndicator() {
  const [status, setStatus] = useState<'loading' | 'optimized' | 'hidden'>('loading')

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setStatus('optimized')
      
      const hideTimer = setTimeout(() => {
        setStatus('hidden')
      }, 3000)

      return () => clearTimeout(hideTimer)
    }, 4000)

    return () => clearTimeout(loadingTimer)
  }, [])

  if (status === 'hidden') return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fadeIn">
      {status === 'loading' ? (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-semibold"></span>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold"></span>
        </div>
      )}
    </div>
  )
}
