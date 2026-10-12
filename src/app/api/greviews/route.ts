import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const filePath = path.join(process.cwd(), 'data', 'reviews.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([], { status: 200 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    let reviews = JSON.parse(fileContents);
    
    if (Array.isArray(reviews)) {
      reviews = reviews.filter((r: any) => r.rating >= 4 && r.text?.trim()?.length > 0);
      if (limit && limit > 0) {
        reviews = reviews.slice(0, limit);
      }
    }
    
    return NextResponse.json(reviews, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
  }
}