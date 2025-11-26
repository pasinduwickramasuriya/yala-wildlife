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
    
    return NextResponse.json(reviews);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
  }
}