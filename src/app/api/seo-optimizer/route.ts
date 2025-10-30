import { NextRequest, NextResponse } from 'next/server'
import { analyzeSEO } from '@/lib/seo-service'
import { PageContent, SEOAnalysis } from '@/types/seo'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const pageType = body.type as 'home' | 'blog' | 'package' | 'about' | 'contact' | 'other'
    const validType = ['home', 'blog', 'package', 'about', 'contact', 'other'].includes(pageType) 
      ? pageType 
      : 'other'

    const pageContent: PageContent = {
      title: String(body.title || 'Untitled Page'),
      description: String(body.description || ''),
      content: String(body.content || '').substring(0, 300),
      url: String(body.url || '/'),
      type: validType
    }

    console.log('📤 Analyzing SEO:', pageContent.title)

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('API Timeout')), 30000)
    })

    const analysisPromise: Promise<SEOAnalysis> = analyzeSEO(pageContent)

    const analysis = await Promise.race<SEOAnalysis>([
      analysisPromise,
      timeoutPromise
    ])

    console.log('✅ Analysis complete - Score:', analysis.score)

    return NextResponse.json({
      success: true,
      data: analysis
    })

  } catch (error: unknown) {
    let errorMessage = 'Failed to analyze SEO'
    
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    console.error('❌ SEO Optimizer API Error:', errorMessage)

    return NextResponse.json(
      {
        success: false,
        error: errorMessage
      },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
