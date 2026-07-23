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
              <span className="hidden sm:block font-bold text-xl tracking-wide">আজকের হাদিস</span>
            </Link>
            <nav className="flex items-center space-x-1 sm:space-x-2">
              <Link href="/search" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-xl transition-all">
                খুঁজুন
              </Link>
              <Link href="/bookmarks" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-xl transition-all">
                সেইভড
              </Link>
              <Link href="/archive" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-xl transition-all">
                আর্কাইভ
              </Link>
              <a 
                href="https://wa.me/8801921741176" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-[#25D366] hover:bg-[#25D366]/10 p-2 rounded-xl transition-all"
                title="যোগাযোগ করুন (WhatsApp)"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#25D366" d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.976L1.5 22.5l5.683-1.49a9.936 9.936 0 0 0 4.829 1.246h.004c5.504 0 9.988-4.478 9.988-9.985 0-5.5-4.48-9.987-9.992-9.987v.016zm0 18.28c-1.63 0-3.226-.437-4.62-1.264l-.33-.195-3.432.9.914-3.346-.215-.34a8.31 8.31 0 0 1-1.272-4.475c0-4.61 3.75-8.36 8.365-8.36 4.609 0 8.363 3.75 8.363 8.358-.002 4.61-3.754 8.362-8.363 8.362zm4.562-6.223c-.25-.125-1.482-.732-1.712-.816-.23-.083-.397-.125-.563.125-.167.25-.646.816-.792.983-.146.166-.292.187-.542.062-2.023-1.01-3.21-2.261-3.917-3.755-.146-.25.146-.234.39-.718.083-.166.042-.312-.02-.437-.063-.125-.563-1.354-.77-1.854-.203-.49-.41-.423-.563-.432-.146-.008-.313-.014-.48-.014-.167 0-.437.062-.666.312-.23.25-.875.854-.875 2.083s.896 2.417 1.02 2.583c.125.167 1.763 2.693 4.27 3.774.597.257 1.062.411 1.425.526.6.19 1.147.163 1.577.098.483-.072 1.482-.605 1.691-1.19.208-.584.208-1.084.146-1.19-.062-.104-.23-.166-.48-.291z" />
                </svg>
              </a>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow relative z-10">
          {children}
        </main>
        
        <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200/50 mt-auto relative z-10">
          <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-medium text-center sm:text-left">
              সহীহ বুখারী এবং সহীহ মুসলিম থেকে সংগৃহীত।
            </p>
            <p className="text-xs text-slate-400 text-center sm:text-right">
              © {new Date().getFullYear()}{' '}
              <a 
                href="https://www.facebook.com/masumbillahakhond" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:text-emerald-600 transition-colors"
              >
                Masum Billah Akhond
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
