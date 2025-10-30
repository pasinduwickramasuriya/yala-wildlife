import { GoogleGenerativeAI } from '@google/generative-ai'
import { SEOAnalysis, PageContent } from '@/types/seo'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function analyzeSEO(page: PageContent): Promise<SEOAnalysis> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️ No Gemini API key')
      return getFallback(page)
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash'
    })

    const schemaType = getSchemaType(page.type)

    const prompt = `You are an SEO expert. Analyze this webpage and provide optimized SEO recommendations in JSON format.

Page URL: ${page.url}
Current Title: ${page.title}
Current Description: ${page.description}
Page Type: ${page.type}
Content Preview: ${page.content.substring(0, 500)}

For context, this is for "Yala Wildlife Safari" - a safari tour company in Sri Lanka specializing in:
- Yala National Park safari tours
- Wildlife photography experiences
- Leopard and elephant sightings
- Safari packages and bookings

Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "title": "SEO-optimized title (55-60 characters)",
  "description": "Compelling meta description (150-160 characters)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "score": 85,
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "schema": {
    "@context": "https://schema.org",
    "@type": "${schemaType}",
    "name": "Yala Wildlife Safari"
  }
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('❌ No JSON found in response')
      return getFallback(page)
    }

    const analysis: SEOAnalysis = JSON.parse(jsonMatch[0])
    
    return {
      title: analysis.title || page.title,
      description: analysis.description || page.description,
      keywords: Array.isArray(analysis.keywords) ? analysis.keywords : [],
      score: typeof analysis.score === 'number' ? analysis.score : 75,
      improvements: Array.isArray(analysis.improvements) ? analysis.improvements : [],
      schema: analysis.schema || generateDefaultSchema(page.type)
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('❌ SEO Analysis Error:', error.message || error)
    return getFallback(page)
  }
}

function getFallback(page: PageContent): SEOAnalysis {
  return {
    title: page.title,
    description: page.description,
    keywords: ['yala safari', 'wildlife tours', 'sri lanka safari'],
    score: 75,
    improvements: ['Using fallback SEO optimization'],
    schema: generateDefaultSchema(page.type)
  }
}

function getSchemaType(pageType: string): string {
  const types: Record<string, string> = {
    home: 'Organization',
    blog: 'BlogPosting',
    package: 'Product',
    about: 'AboutPage',
    contact: 'ContactPage',
    other: 'WebPage'
  }
  return types[pageType] || 'WebPage'
}

function generateDefaultSchema(pageType: string): Record<string, unknown> {
  const schemas: Record<string, Record<string, unknown>> = {
    home: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Yala Wildlife Safari',
      url: 'https://www.yalawildlife.com'
    },
    blog: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Yala Wildlife Blog'
    },
    package: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Safari Package'
    }
  }
  
  return schemas[pageType] || {
    '@context': 'https://schema.org',
    '@type': 'WebPage'
  }
}
