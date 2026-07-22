import { NextResponse } from 'next/server';
import { getRandomHadith } from '@/lib/hadith';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  const hadith = getRandomHadith();

  if (!hadith) {
    return NextResponse.json({ error: 'No hadith found' }, { status: 404 });
  }

  return NextResponse.json({
    date: format(new Date(), 'yyyy-MM-dd'),
    ...hadith
  });
}
