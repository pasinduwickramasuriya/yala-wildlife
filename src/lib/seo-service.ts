import { GoogleGenerativeAI } from '@google/generative-ai'
import { SEOAnalysis, PageContent } from '@/types/seo'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function analyzeSEO(page: PageContent): Promise<SEOAnalysis> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `You are an SEO expert. Analyze this webpage and provide optimized SEO recommendations in JSON format.

Page URL: ${page.url}
Current Title: ${page.title}
Current Description: ${page.description}
Page Type: ${page.type}
Content Preview: ${page.content.substring(0, 1000)}

For context, this is for "Yala Wildlife Safari" - a safari tour company in Sri Lanka specializing in:
- Yala National Park safari tours
- Wildlife photography experiences
- Leopard and elephant sightings
- Safari packages and bookings

Return ONLY a valid JSON object with this exact structure:
{
  "title": "SEO-optimized title (55-60 characters, include 'Yala Safari' or 'Yala Wildlife')",
  "description": "Compelling meta description (150-160 characters with call-to-action)",
  "keywords": ["primary keyword", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
  "score": 85,
  "improvements": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
  "schema": {
    "@context": "https://schema.org",
    "@type": "${getSchemaType(page.type)}",
    "name": "optimized name"
  }
}

Ensure the title starts with a strong keyword and includes location "Sri Lanka" or "Yala" where appropriate.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON in response')
    }

    const analysis: SEOAnalysis = JSON.parse(jsonMatch[0])
    
    // Validate and set defaults
    return {
      title: analysis.title || page.title,
      description: analysis.description || page.description,
      keywords: Array.isArray(analysis.keywords) ? analysis.keywords : [],
      score: typeof analysis.score === 'number' ? analysis.score : 70,
      improvements: Array.isArray(analysis.improvements) ? analysis.improvements : [],
      schema: analysis.schema || {}
    }

  } catch (error) {
    console.error('SEO Analysis Error:', error)
    
    // Return fallback analysis
    return {
      title: page.title,
      description: page.description,
      keywords: ['yala safari', 'wildlife tours', 'sri lanka safari'],
      score: 70,
      improvements: ['Unable to generate AI recommendations at this time'],
      schema: generateDefaultSchema(page.type)
    }
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
