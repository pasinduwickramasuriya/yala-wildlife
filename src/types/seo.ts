export interface SEOAnalysis {
  title: string
  description: string
  keywords: string[]
  score: number
  improvements: string[]
  schema: Record<string, unknown>
}

export interface PageContent {
  title: string
  description: string
  content: string
  url: string
  type: 'home' | 'blog' | 'package' | 'about' | 'contact' | 'other'
}
