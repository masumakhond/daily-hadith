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
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative overflow-hidden md:overflow-visible">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[150%] max-w-[800px] h-[300px] bg-gradient-to-r from-emerald-100/40 via-teal-100/40 to-sky-100/40 blur-[100px] rounded-full -z-10"></div>
      
      <div className="mb-14 text-center space-y-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
          আর্কাইভ
        </h1>
        <p className="text-slate-500 font-medium text-lg tracking-wide">পূর্ববর্তী দিনের হাদিসসমূহ</p>
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
