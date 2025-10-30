'use client'

import { useAutoSEO } from '@/hooks/useAutoSEO'
import { useEffect, useState } from 'react'

interface AutoSEOWrapperProps {
  children: React.ReactNode
  pageTitle: string
  pageDescription: string
  pageType: 'home' | 'blog' | 'package' | 'about' | 'contact' | 'other'
  showDebug?: boolean
}

export function AutoSEOWrapper({
  children,
  pageTitle,
  pageDescription,
  pageType,
  showDebug = false
}: AutoSEOWrapperProps) {
  const [pageContent, setPageContent] = useState('')
  const [pageUrl, setPageUrl] = useState('/')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageContent(document.body.innerText.substring(0, 2000))
      setPageUrl(window.location.pathname)
    }
  }, [])

  useAutoSEO(pageTitle, pageDescription, pageContent, pageUrl, pageType)

  return (
    <>
      {children}
      {showDebug && <SEODebugPanel />}
    </>
  )
}

function SEODebugPanel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [meta, setMeta] = useState<any>({})

  useEffect(() => {
    const interval = setInterval(() => {
      setMeta({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content')
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 left-4 bg-black/95 text-green-400 p-4 rounded-lg text-xs max-w-md z-50 font-mono shadow-xl border border-green-500">
      <div className="font-bold mb-2 text-green-300">🔍 SEO Debug Panel</div>
      <div className="space-y-1">
        <div><strong className="text-white">Title:</strong> {meta.title || 'Loading...'}</div>
        <div><strong className="text-white">Desc:</strong> {meta.description?.substring(0, 60) || 'Loading...'}...</div>
        <div><strong className="text-white">Keywords:</strong> {meta.keywords?.substring(0, 60) || 'Loading...'}...</div>
      </div>
    </div>
  )
}
