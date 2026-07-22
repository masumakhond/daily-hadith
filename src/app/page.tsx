import { getHadithForDate } from '@/lib/hadith';
import HadithCard from '@/components/HadithCard';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

export default function Home() {
  const today = new Date();
  const hadith = getHadithForDate(today);

  if (!hadith) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-500 text-lg">কোনো হাদিস পাওয়া যায়নি।</p>
      </div>
    );
  }

  const dateStr = format(today, 'dd MMMM yyyy', { locale: bn });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">আজকের হাদিস</h1>
        <p className="text-slate-500">{dateStr}</p>
      </div>
      
      <HadithCard hadith={hadith} dateLabel="আজকের হাদিস" />
    </div>
  );
}
