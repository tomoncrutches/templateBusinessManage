import '@/styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import type { Metadata } from 'next';
import MobileHeader from '@/components/mobile-header';
import Navbar from '@/components/navbar';
import { Toaster } from 'sonner';

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
    <>
      <Navbar />
      <MobileHeader />
      {children}
      <Toaster />
    </>
  );
}
