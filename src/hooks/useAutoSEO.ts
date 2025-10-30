'use client'

import { useEffect } from 'react'

export function useAutoSEO(
  pageTitle: string,
  pageDescription: string,
  pageContent: string,
  pageUrl: string,
  pageType: string
) {
  useEffect(() => {
    async function optimizeSEO() {
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
            content: pageContent.substring(0, 500),
            url: pageUrl,
            type: pageType
          }),
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.data) {
          document.title = data.data.title
          updateMetaTag('description', data.data.description)
          updateMetaTag('keywords', Array.isArray(data.data.keywords) ? data.data.keywords.join(', ') : '')
          updateMetaTag('og:title', data.data.title, 'property')
          updateMetaTag('og:description', data.data.description, 'property')
          updateMetaTag('twitter:title', data.data.title, 'name')
          updateMetaTag('twitter:description', data.data.description, 'name')

          if (data.data.schema) {
            injectSchema(data.data.schema)
          }

          console.log('✅ SEO Auto-Optimized!')
          console.log('📊 Score:', data.data.score + '/100')
          console.log('🎯 Title:', data.data.title)
          console.log('📝 Description:', data.data.description)
          console.log('🔑 Keywords:', data.data.keywords)
        } else {
          console.error('❌ SEO optimization failed:', data.error)
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.error('⏰ Auto-SEO timeout')
        } else {
          console.error('❌ Auto-SEO error:', error.message)
        }
      }
    }

    const timer = setTimeout(() => {
      optimizeSEO()
    }, 1000)

    return () => clearTimeout(timer)
  }, [pageTitle, pageDescription, pageContent, pageUrl, pageType])
}

function updateMetaTag(name: string, content: string, attribute: string = 'name'): void {
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
