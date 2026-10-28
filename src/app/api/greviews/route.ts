import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'reviews.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([], { status: 200 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const reviews = JSON.parse(fileContents);
    
    // Only return top 10 high-rated reviews with minimal fields to keep payload under 15KB
    const optimized = reviews
      .filter((r: any) => r.rating >= 4 && r.text?.trim().length > 0)
      .slice(0, 10)
      .map((r: any) => ({
        id: r.id,
        author_name: r.author_name,
        profile_photo_url: r.profile_photo_url || '',
        rating: r.rating,
        relative_time_description: r.relative_time_description || '',
        text: r.text.length > 200 ? r.text.slice(0, 200) + '…' : r.text,
      }));

    return NextResponse.json(optimized, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
  }
}