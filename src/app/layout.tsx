
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AppContextProvider } from '@/contexts/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'The Scent - Discover Your Signature Scent',
  description: 'AI-Powered Aromatherapy E-commerce Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" 
          enableSystem
          disableTransitionOnChange
        >
          <AppContextProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow"> {/* Removed pt-16 as navbar is not fixed height anymore, or rather, its bg is distinct */}
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
