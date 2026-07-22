import { NextResponse } from 'next/server';
import { getHadithForDate } from '@/lib/hadith';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  const today = new Date();
  const hadith = getHadithForDate(today);

  if (!hadith) {
    return NextResponse.json({ error: 'No hadith found' }, { status: 404 });
  }

  return NextResponse.json({
    date: format(today, 'yyyy-MM-dd'),
    ...hadith
  });
}
