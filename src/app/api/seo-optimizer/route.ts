import { NextRequest, NextResponse } from 'next/server'
import { analyzeSEO } from '@/lib/seo-service'
import { PageContent } from '@/types/seo'

export const maxDuration = 25

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const pageContent: PageContent = {
      title: body.title || 'Untitled Page',
      description: body.description || '',
      content: body.content || '',
      url: body.url || '/',
      type: body.type || 'other'
    }

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('API Timeout')), 20000)
    })

    const analysisPromise = analyzeSEO(pageContent)

    const analysis = await Promise.race([analysisPromise, timeoutPromise])

    return NextResponse.json({
      success: true,
      data: analysis
    })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('SEO Optimizer API Error:', error.message)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to analyze SEO'
      },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
