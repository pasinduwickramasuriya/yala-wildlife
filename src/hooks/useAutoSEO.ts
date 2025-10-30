'use client'

import { useEffect } from 'react'

export function useAutoSEO(
  pageTitle: string,
  pageDescription: string,
  pageContent: string,
  pageUrl: string,
  pageType: string
): void {
  useEffect(() => {
    async function optimizeSEO(): Promise<void> {
      try {
        console.log('🔄 Starting Auto-SEO optimization...')

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 25000)

        const response = await fetch('/api/seo-optimizer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: pageTitle,
            description: pageDescription,
            content: pageContent.substring(0, 300),
            url: pageUrl,
            type: pageType
          }),
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json() as Record<string, unknown>

        if (data.success === true && data.data) {
          const seoData = data.data as Record<string, unknown>
          
          if (typeof seoData.title === 'string') {
            document.title = seoData.title
          }

          if (typeof seoData.description === 'string') {
            updateMetaTag('description', seoData.description)
          }

          if (Array.isArray(seoData.keywords)) {
            updateMetaTag('keywords', seoData.keywords.join(', '))
          }

          if (typeof seoData.title === 'string') {
            updateMetaTag('og:title', seoData.title, 'property')
          }

          if (typeof seoData.description === 'string') {
            updateMetaTag('og:description', seoData.description, 'property')
          }

          if (typeof seoData.title === 'string') {
            updateMetaTag('twitter:title', seoData.title, 'name')
          }

          if (typeof seoData.description === 'string') {
            updateMetaTag('twitter:description', seoData.description, 'name')
          }

          if (seoData.schema && typeof seoData.schema === 'object') {
            injectSchema(seoData.schema as Record<string, unknown>)
          }

          console.log('✅ SEO Auto-Optimized!')
          console.log('📊 Score:', seoData.score, '/100')
          console.log('🎯 Title:', seoData.title)
          console.log('📝 Description:', seoData.description)
          console.log('🔑 Keywords:', seoData.keywords)
        } else {
          console.warn('⚠️ SEO optimization incomplete:', data.error || 'No data')
          applyFallbackSEO(pageTitle, pageDescription)
        }
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          console.error('⏰ Auto-SEO timeout (25s)')
        } else if (error instanceof Error) {
          console.error('❌ Auto-SEO error:', error.message)
        } else {
          console.error('❌ Auto-SEO error:', error)
        }
        applyFallbackSEO(pageTitle, pageDescription)
      }
    }

    const timer = setTimeout(() => {
      optimizeSEO()
    }, 1000)

    return () => clearTimeout(timer)
  }, [pageTitle, pageDescription, pageContent, pageUrl, pageType])
}

function updateMetaTag(
  name: string,
  content: string,
  attribute: string = 'name'
): void {
  if (!content) return

  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', content)
}

function injectSchema(schema: Record<string, unknown>): void {
  const existing = document.getElementById('auto-seo-schema')
  if (existing) {
    existing.remove()
  }

  const script = document.createElement('script')
  script.id = 'auto-seo-schema'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(schema, null, 2)
  document.head.appendChild(script)
}

function applyFallbackSEO(title: string, description: string): void {
  document.title = title
  updateMetaTag('description', description)
  console.log('📋 Applied fallback SEO')
}
