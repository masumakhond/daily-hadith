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
              <Link href="/search" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-xl transition-all">
                খুঁজুন
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
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.013 2.014c-5.464 0-9.897 4.435-9.897 9.896 0 1.942.503 3.829 1.458 5.48L2 22l4.739-1.242a9.852 9.852 0 005.274 1.503h.004c5.463 0 9.896-4.433 9.896-9.896 0-5.46-4.433-9.896-9.896-9.896zM17.152 14.8c-.282-.14-1.666-.823-1.924-.916-.258-.094-.446-.14-.634.14-.188.281-.728.916-.893 1.103-.164.188-.33.21-.611.071-2.28-1.144-3.616-2.55-4.413-4.226-.166-.282.164-.265.437-.811.094-.188.047-.352-.047-.493-.094-.14-.634-1.53-.87-2.095-.23-.55-.465-.476-.634-.485-.164-.009-.352-.012-.54-.012-.188 0-.493.071-.751.352-.258.282-.986.963-.986 2.348 0 1.386 1.01 2.724 1.15 2.912.14.188 1.986 3.033 4.814 4.254.673.29 1.198.463 1.606.593.676.215 1.291.184 1.776.111.543-.082 1.666-.681 1.901-1.34.235-.658.235-1.221.164-1.34-.07-.117-.258-.188-.54-.329z" />
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
