import { differenceInDays, startOfDay, parseISO } from 'date-fns';
import hadithsData from '@/data/hadiths.json';

export type Hadith = {
  id: string;
  source: 'bukhari' | 'muslim';
  bookNumber: number;
  hadithNumber: number;
  textBn: string;
  grade: string;
};

// Start epoch: We pick an arbitrary date in the past as the start point.
// Jan 1, 2024
const EPOCH_DATE = startOfDay(new Date('2024-01-01T00:00:00.000Z'));

const hadiths = hadithsData as Hadith[];
const totalHadiths = hadiths.length;

export function getHadithForDate(date: Date): Hadith | null {
  if (totalHadiths === 0) return null;

  const targetDate = startOfDay(date);
  
  // Number of days since epoch
  const daysDiff = differenceInDays(targetDate, EPOCH_DATE);
  
  // If the date is before epoch, we could either allow negative modulus or just set it to 0.
  // We'll support negative dates by making modulo positive.
  let index = daysDiff % totalHadiths;
  if (index < 0) {
    index = (index + totalHadiths) % totalHadiths;
  }

  return hadiths[index];
}

export function getRandomHadith(): Hadith | null {
  if (totalHadiths === 0) return null;
  const randomIndex = Math.floor(Math.random() * totalHadiths);
  return hadiths[randomIndex];
}

export function getHadithByDateString(dateStr: string): Hadith | null {
  try {
    const parsedDate = parseISO(dateStr);
    return getHadithForDate(parsedDate);
  } catch (e) {
    return null;
  }
}
