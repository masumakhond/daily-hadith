'use client';

import { useEffect, useState } from 'react';
import HadithCard from '@/components/HadithCard';
import { Hadith } from '@/lib/hadith';
import { Loader2, BookmarkX } from 'lucide-react';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const stored = localStorage.getItem('bookmarks');
      if (!stored) {
        setBookmarks([]);
        setLoading(false);
        return;
      }

      const ids = JSON.parse(stored) as string[];
      if (ids.length === 0) {
        setBookmarks([]);
        setLoading(false);
        return;
      }

      const res = await fetch('/api/hadith/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });
      
      if (res.ok) {
        const data = await res.json();
        // Sort data to match the order of IDs in localStorage (newest first if appended, etc.)
        // We'll just display them as returned for simplicity, or reverse to show newest first
        setBookmarks(data.reverse());
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();

    // Listen for changes from other components (like removing a bookmark on this page)
    const handleUpdate = () => {
      fetchBookmarks();
    };
    
    window.addEventListener('bookmarksUpdated', handleUpdate);
    return () => window.removeEventListener('bookmarksUpdated', handleUpdate);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative overflow-hidden md:overflow-visible">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[150%] max-w-[800px] h-[300px] bg-gradient-to-r from-emerald-100/40 via-teal-100/40 to-sky-100/40 blur-[100px] rounded-full -z-10"></div>
      
      <div className="mb-14 text-center space-y-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
          বুকমার্কসমূহ
        </h1>
        <p className="text-slate-500 font-medium text-lg tracking-wide">আপনার সেইভ করা হাদিস</p>
      </div>
      
      {loading ? (
        <div className="min-h-[30vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="space-y-12">
          {bookmarks.map((hadith) => (
            <div key={hadith.id} className="relative">
              <HadithCard hadith={hadith} dateLabel={`হাদিস: ${hadith.hadithNumber}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4">
          <div className="bg-white/50 p-6 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col items-center text-center max-w-sm">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
              <BookmarkX className="w-8 h-8 text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">কোনো বুকমার্ক নেই</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              আপনি এখনো কোনো হাদিস সেইভ করেননি। হাদিস কার্ডের 'সেইভ' বাটনে ক্লিক করে বুকমার্ক করুন।
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
