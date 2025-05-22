import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/features/theme';
import { MainLayout } from '@/features/layout';
import { cn } from '@/lib/utils/cn';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AromaChat',
  description: 'A modern chat application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
