import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { Book } from 'lucide-react';

const tiroBangla = Tiro_Bangla({
  variable: "--font-tiro-bangla",
  subsets: ["bengali"],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: "আজকের হাদিস | Today's Hadith",
  description: "প্রতিদিনের সহীহ হাদিস - Daily authentic Hadith from Sahih Bukhari and Sahih Muslim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${tiroBangla.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50/50 text-slate-900 font-bengali selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
        
        {/* Subtle top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400"></div>
        
        <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50">
          <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 text-slate-800 hover:text-emerald-600 transition-colors group">
              <div className="bg-emerald-100/50 p-2 rounded-xl group-hover:bg-emerald-100 transition-colors">
                <Book className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-bold text-xl tracking-wide">আজকের হাদিস</span>
            </Link>
            <nav className="flex items-center space-x-1 sm:space-x-2">
              <Link href="/search" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all">
                খুঁজুন
              </Link>
              <Link href="/archive" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all">
                আর্কাইভ
              </Link>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow relative z-10">
          {children}
        </main>
        
        <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200/50 mt-auto relative z-10">
          <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-medium">
              সহীহ বুখারী এবং সহীহ মুসলিম থেকে সংগৃহীত।
            </p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} আজকের হাদিস
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
