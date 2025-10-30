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

        const response = await fetch('/api/seo-optimizer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: pageTitle,
            description: pageDescription,
            content: pageContent,
            url: pageUrl,
            type: pageType
          })
        })

        const data = await response.json()

        if (data.success) {
          // Update page title
          document.title = data.data.title

          // Update meta description
          updateMetaTag('description', data.data.description)

          // Update keywords
          updateMetaTag('keywords', data.data.keywords.join(', '))

          // Update Open Graph
          updateMetaTag('og:title', data.data.title, 'property')
          updateMetaTag('og:description', data.data.description, 'property')

          // Update Twitter Card
          updateMetaTag('twitter:title', data.data.title, 'name')
          updateMetaTag('twitter:description', data.data.description, 'name')

          // Inject Schema
          injectSchema(data.data.schema)

          console.log('✅ SEO Auto-Optimized!')
          console.log('📊 Score:', data.data.score + '/100')
          console.log('🎯 Title:', data.data.title)
          console.log('📝 Description:', data.data.description)
          console.log('🔑 Keywords:', data.data.keywords)
        } else {
          console.error('❌ SEO optimization failed:', data.error)
        }
      } catch (error) {
        console.error('❌ Auto-SEO error:', error)
      }
    }

    // Run automatically after short delay
    const timer = setTimeout(() => {
      optimizeSEO()
    }, 2000)

    return () => clearTimeout(timer)
  }, [pageTitle, pageDescription, pageContent, pageUrl, pageType])
}

function updateMetaTag(name: string, content: string, attribute = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
  
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }
  
  meta.setAttribute('content', content)
}

function injectSchema(schema: Record<string, unknown>) {
  const existing = document.getElementById('auto-seo-schema')
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.id = 'auto-seo-schema'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(schema, null, 2)
  document.head.appendChild(script)
}
