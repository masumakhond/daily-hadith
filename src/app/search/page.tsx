import { Hadith } from '@/lib/hadith';
import hadithsData from '@/data/hadiths.json';
import HadithCard from '@/components/HadithCard';
import { Search } from 'lucide-react';
import Form from 'next/form';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  // Limit search results to 20 for performance
  let results: Hadith[] = [];
  if (query.length > 0) {
    const allHadiths = hadithsData as Hadith[];
    results = allHadiths.filter((h) => h.textBn.includes(query)).slice(0, 20);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative overflow-hidden md:overflow-visible">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[150%] max-w-[800px] h-[300px] bg-gradient-to-r from-emerald-100/40 via-teal-100/40 to-sky-100/40 blur-[100px] rounded-full -z-10"></div>
      
      <div className="mb-14 text-center space-y-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
          হাদিস খুঁজুন
        </h1>
        
        {/* Search Form */}
        <Form action="/search" className="max-w-2xl mx-auto relative group">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="বাংলা শব্দ বা বাক্য দিয়ে খুঁজুন..."
            className="w-full pl-6 pr-14 py-4 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-lg placeholder:text-slate-400"
            required
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </Form>

        {query && (
          <p className="text-slate-500 font-medium text-lg tracking-wide">
            "{query}" এর জন্য {results.length === 20 ? '২০+টি' : `${results.length}টি`} ফলাফল পাওয়া গেছে
          </p>
        )}
      </div>
      
      {query && results.length > 0 && (
        <div className="space-y-12">
          {results.map((hadith, idx) => (
            <div key={idx} className="relative">
              <HadithCard hadith={hadith} dateLabel={`হাদিস: ${hadith.hadithNumber}`} />
            </div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="min-h-[30vh] flex items-center justify-center">
          <p className="text-slate-400 text-lg bg-white/50 px-8 py-4 rounded-2xl backdrop-blur-sm border border-white/50">
            কোনো ফলাফল পাওয়া যায়নি।
          </p>
        </div>
      )}
    </div>
  );
}
