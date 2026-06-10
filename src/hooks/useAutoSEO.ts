'use client'

export function useAutoSEO(
  pageTitle: string,
  pageDescription: string,
  pageContent: string,
  pageUrl: string,
  pageType: string
): void {
  // ✅ Neutralized to prevent client-side SEO overrides and layout shifts.
  // Next.js native server-side metadata and schemas are used instead.
}
