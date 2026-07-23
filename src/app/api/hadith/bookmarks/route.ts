import { NextResponse } from 'next/server';
import hadithsData from '@/data/hadiths.json';
import { Hadith } from '@/lib/hadith';

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();
    
    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const allHadiths = hadithsData as Hadith[];
    const idSet = new Set(ids);
    
    // Filter and return the matching hadiths
    const bookmarkedHadiths = allHadiths.filter(h => idSet.has(h.id));

    // Preserve the order of the IDs if possible, or just return them
    return NextResponse.json(bookmarkedHadiths);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}
