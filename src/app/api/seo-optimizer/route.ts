import { NextRequest, NextResponse } from 'next/server'
import { analyzeSEO } from '@/lib/seo-service'
import { PageContent } from '@/types/seo'

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

    const analysis = await analyzeSEO(pageContent)

    return NextResponse.json({
      success: true,
      data: analysis
    })

  } catch (error) {
    console.error('SEO Optimizer API Error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze SEO'
      },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
