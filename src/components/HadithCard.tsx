'use client';

import { Hadith } from '@/lib/hadith';
import { Share2, Copy, Check, Quote, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HadithCard({ hadith, dateLabel }: { hadith: Hadith; dateLabel?: string }) {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bookmarks');
      if (stored) {
        const bookmarks = JSON.parse(stored) as string[];
        if (bookmarks.includes(hadith.id)) {
          setIsBookmarked(true);
        }
      }
    } catch (e) {}
  }, [hadith.id]);

  const toggleBookmark = () => {
    try {
      const stored = localStorage.getItem('bookmarks');
      let bookmarks = stored ? (JSON.parse(stored) as string[]) : [];
      
      if (isBookmarked) {
        bookmarks = bookmarks.filter(id => id !== hadith.id);
        setIsBookmarked(false);
      } else {
        if (!bookmarks.includes(hadith.id)) {
          bookmarks.push(hadith.id);
        }
        setIsBookmarked(true);
      }
      
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      window.dispatchEvent(new Event('bookmarksUpdated'));
    } catch (e) {
      console.error('Failed to save bookmark', e);
    }
  };

  const formatSource = (source: string, book: number, hadithNum: number) => {
    const bookName = source === 'bukhari' ? 'সহীহ বুখারী' : 'সহীহ মুসলিম';
    return `${bookName} • পর্ব: ${book} • হাদিস: ${hadithNum}`;
  };

  const textToShare = `${hadith.textBn}\n\n${formatSource(hadith.source, hadith.bookNumber, hadith.hadithNumber)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'আজকের হাদিস',
          text: textToShare,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
      
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
      
      <div className="relative px-6 py-5 flex justify-between items-center border-b border-slate-100/80">
        <span className="text-emerald-700/80 font-semibold tracking-wide text-sm uppercase">
          {dateLabel || 'হাদিস'}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100/50 uppercase shadow-sm">
          {hadith.grade === 'Sahih' ? 'সহীহ' : hadith.grade}
        </span>
      </div>
      
      <div className="relative p-6 md:p-12">
        <Quote className="absolute top-6 left-6 md:top-10 md:left-10 w-12 h-12 text-emerald-500/10 rotate-180" />
        
        <p className="relative z-10 text-xl sm:text-[1.35rem] md:text-[1.65rem] leading-[2.1] sm:leading-[2.2] md:leading-[2.4] text-slate-700 whitespace-pre-wrap text-center sm:px-4 md:px-8 font-medium">
          {hadith.textBn}
        </p>
        
        <div className="mt-10 pt-6 md:pt-8 border-t border-slate-100/80 flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-left">
          <div className="text-sm font-semibold text-slate-400 bg-slate-50/50 px-4 py-2 rounded-xl inline-block w-full md:w-auto">
            {formatSource(hadith.source, hadith.bookNumber, hadith.hadithNumber)}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full md:w-auto">
            <button
              onClick={handleCopy}
              className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 space-x-2 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 hover:text-emerald-600 rounded-xl transition-all duration-300 border border-slate-200 shadow-sm hover:shadow active:scale-95"
              title="কপি করুন"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'কপি' : 'কপি'}</span>
            </button>
            <button
              onClick={toggleBookmark}
              className={`inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 space-x-2 text-sm font-semibold rounded-xl transition-all duration-300 border shadow-sm hover:shadow active:scale-95 ${
                isBookmarked 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-emerald-600'
              }`}
              title="বুকমার্ক করুন"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-500 text-emerald-500' : ''}`} />
              <span>{isBookmarked ? 'সেইভড' : 'সেইভ'}</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex w-full sm:w-auto items-center justify-center px-5 py-2.5 space-x-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
              <span>শেয়ার করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
