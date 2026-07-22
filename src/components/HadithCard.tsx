'use client';

import { Hadith } from '@/lib/hadith';
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function HadithCard({ hadith, dateLabel }: { hadith: Hadith; dateLabel?: string }) {
  const [copied, setCopied] = useState(false);

  const formatSource = (source: string, book: number, hadithNum: number) => {
    const bookName = source === 'bukhari' ? 'সহীহ বুখারী' : 'সহীহ মুসলিম';
    return `${bookName} - পর্ব: ${book}, হাদিস: ${hadithNum}`;
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-emerald-50/50 border-b border-emerald-100/50 px-6 py-4 flex justify-between items-center">
        <span className="text-emerald-800 font-medium text-sm">
          {dateLabel || 'হাদিস'}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
          {hadith.grade === 'Sahih' ? 'সহীহ' : hadith.grade}
        </span>
      </div>
      
      <div className="p-6 md:p-8">
        <p className="text-xl md:text-2xl leading-relaxed text-slate-800 whitespace-pre-wrap">
          {hadith.textBn}
        </p>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-sm font-medium text-slate-500">
            {formatSource(hadith.source, hadith.bookNumber, hadith.hadithNumber)}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              title="কপি করুন"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
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
