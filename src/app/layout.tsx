import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { Book } from 'lucide-react';

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ['400', '500', '600', '700'],
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
    <html lang="bn" className={`${notoSansBengali.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-bengali">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-emerald-700 font-bold text-xl">
              <Book className="w-6 h-6" />
              <span>আজকের হাদিস</span>
            </Link>
            <nav>
              <Link href="/archive" className="text-slate-600 hover:text-emerald-700 font-medium transition-colors">
                আর্কাইভ
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-200 mt-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-slate-500">
            <p>সহীহ বুখারী এবং সহীহ মুসলিম থেকে সংগৃহীত।</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
