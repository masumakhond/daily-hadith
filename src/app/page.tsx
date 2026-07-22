import { getHadithForDate } from '@/lib/hadith';
import HadithCard from '@/components/HadithCard';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

export default function Home() {
  const today = new Date();
  const hadith = getHadithForDate(today);

  if (!hadith) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-400 text-lg bg-white/50 px-8 py-4 rounded-2xl backdrop-blur-sm border border-white/50">
          কোনো হাদিস পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  const dateStr = format(today, 'dd MMMM yyyy', { locale: bn });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative overflow-hidden md:overflow-visible">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[150%] max-w-[800px] h-[300px] bg-gradient-to-r from-emerald-100/40 via-teal-100/40 to-sky-100/40 blur-[100px] rounded-full -z-10"></div>
      
      <div className="mb-14 text-center space-y-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
          আজকের হাদিস
        </h1>
        <p className="text-slate-500 font-medium text-lg tracking-wide">{dateStr}</p>
      </div>
      
      <HadithCard hadith={hadith} dateLabel="আজকের হাদিস" />
    </div>
  );
}
