import { NextResponse } from 'next/server';
import { getHadithByDateString } from '@/lib/hadith';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;
  const hadith = getHadithByDateString(date);

  if (!hadith) {
    return NextResponse.json({ error: 'Invalid date or no hadith found' }, { status: 404 });
  }

  return NextResponse.json({
    date,
    ...hadith
  });
}
