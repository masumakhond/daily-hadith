import { getHadithForDate } from '@/lib/hadith';
import HadithCard from '@/components/HadithCard';
import { format, subDays } from 'date-fns';
import { bn } from 'date-fns/locale';

export default function ArchivePage() {
  const today = new Date();
  
  // Get hadiths for the last 10 days
  const pastHadiths = Array.from({ length: 10 }).map((_, i) => {
    const date = subDays(today, i + 1);
    const hadith = getHadithForDate(date);
    return {
      date,
      dateStr: format(date, 'dd MMMM yyyy', { locale: bn }),
      hadith
    };
  }).filter(item => item.hadith !== null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10 text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">আর্কাইভ</h1>
        <p className="text-slate-500">পূর্ববর্তী দিনের হাদিসসমূহ</p>
      </div>
      
      <div className="space-y-12">
        {pastHadiths.map(({ dateStr, hadith }, idx) => (
          hadith && (
            <div key={idx} className="relative">
              <HadithCard hadith={hadith} dateLabel={dateStr} />
            </div>
          )
        ))}
      </div>
    </div>
  );
}
