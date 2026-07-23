import { parseISO } from 'date-fns';
import hadithsData from '@/data/hadiths.json';

export type Hadith = {
  id: string;
  source: 'bukhari' | 'muslim';
  bookNumber: number;
  hadithNumber: number;
  textBn: string;
  grade: string;
};

const hadiths = hadithsData as Hadith[];
const totalHadiths = hadiths.length;

export function getHadithForDate(date: Date): Hadith | null {
  if (totalHadiths === 0) return null;

  // 1. Convert the JS Date to Bangladesh Time (UTC+6)
  // We do this by adding 6 hours to the UTC timestamp.
  const timestamp = date.getTime();
  const bstTime = timestamp + (6 * 60 * 60 * 1000);
  
  // 2. Calculate the "Day Number" based on Bangladesh time.
  // We divide by milliseconds in a day to get a unique integer for each day.
  // Because we shifted the time by 6 hours, this division naturally rolls over exactly at midnight BST (18:00 UTC).
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const daysDiff = Math.floor(bstTime / MS_PER_DAY);
  
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
