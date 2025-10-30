import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key found' }, { status: 500 })
    }

    console.log('Testing API Key:', apiKey.substring(0, 10) + '...')

    const genAI = new GoogleGenerativeAI(apiKey)
    // const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const result = await model.generateContent('Say hello')
    const text = result.response.text()

    return NextResponse.json({ 
      success: true, 
      response: text,
      message: 'API key is working!'
    })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('API Test Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.toString()
    }, { status: 500 })
  }
}
