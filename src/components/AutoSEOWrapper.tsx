'use client'

import React from 'react'

interface AutoSEOWrapperProps {
  children: React.ReactNode
  pageTitle?: string
  pageDescription?: string
  pageType?: 'home' | 'blog' | 'package' | 'about' | 'contact' | 'other'
  showDebug?: boolean
}

export function AutoSEOWrapper({
  children,
}: AutoSEOWrapperProps) {
  return <>{children}</>
}
