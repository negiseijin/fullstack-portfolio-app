import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { JSX } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A full-stack portfolio application.',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <div className="grid min-h-screen grid-rows-[auto_1fr_auto] px-4">
            <Header />
            <main>
              <div className="container mx-auto py-8">{children}</div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
