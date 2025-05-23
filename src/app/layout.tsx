import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './styles.css';
import { ThemeProvider } from '@/features/theme/components/theme-provider';
import { MainLayout } from '@/features/layout/components/main-layout';
import { cn } from '@/lib/utils/cn';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider } from '@/features/layout/contexts/sidebar-context';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: false,
  preload: true,
});

export const metadata: Metadata = {
  title: 'AromaChat',
  description: 'A modern chat application with a beautiful interface',
  keywords: ['chat', 'messaging', 'real-time', 'collaboration'],
  authors: [{ name: 'AromaChat Team' }],
  creator: 'AromaChat',
  publisher: 'AromaChat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AromaChat',
    description: 'A modern chat application with a beautiful interface',
    url: 'https://aromachat.app',
    siteName: 'AromaChat',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AromaChat',
    description: 'A modern chat application with a beautiful interface',
    creator: '@aromachat',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030711' },
  ],
  colorScheme: 'light dark',
};

// Helper component to avoid flash of unstyled content
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(
      'min-h-screen bg-background font-sans antialiased',
      'text-foreground',
      'transition-colors duration-200',
      'flex flex-col'
    )}>
      {children}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={cn(
        'h-full',
        inter.variable,
        'motion-safe:scroll-smooth',
        'antialiased'
      )}
    >
      <body className="min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeWrapper>
            <TooltipProvider delayDuration={300} skipDelayDuration={0}>
              <SidebarProvider>
                <MainLayout>
                  {children}
                </MainLayout>
              </SidebarProvider>
            </TooltipProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
