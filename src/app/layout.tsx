import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Megallón',
  description: 'Sistema administrativo para local de comidas veganas Megallón.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background font-sans text-primary antialiased lg:flex-row',
          inter.variable,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
