'use client'

import { useEffect, useState } from 'react'

export function SEODebug() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [metaData, setMetaData] = useState<any>({})

  useEffect(() => {
    const updateMeta = () => {
      const title = document.title
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')
      const schema = document.getElementById('auto-seo-schema')?.textContent
      
      setMetaData({ title, description, keywords, hasSchema: !!schema })
    }

    // Update immediately
    updateMeta()

    // Update every second
    const interval = setInterval(updateMeta, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 right-4 bg-black/95 text-green-400 p-6 rounded-lg text-sm max-w-lg z-50 font-mono shadow-xl border border-green-500">
      <div className="font-bold mb-3 text-green-300 text-lg">🔍 Live SEO Monitor</div>
      <div className="space-y-3">
        <div>
          <strong className="text-white block mb-1">Page Title:</strong>
          <div className="text-green-400 text-xs">{metaData.title || 'Loading...'}</div>
        </div>
        <div>
          <strong className="text-white block mb-1">Meta Description:</strong>
          <div className="text-green-400 text-xs">{metaData.description || 'Loading...'}</div>
        </div>
        <div>
          <strong className="text-white block mb-1">Keywords:</strong>
          <div className="text-green-400 text-xs">{metaData.keywords || 'Loading...'}</div>
        </div>
        <div>
          <strong className="text-white block mb-1">Schema Markup:</strong>
          <div className={metaData.hasSchema ? 'text-green-400' : 'text-yellow-400'}>
            {metaData.hasSchema ? '✓ Injected' : '⏳ Loading...'}
          </div>
        </div>
      </div>
    </div>
  )
}
