'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { ReloadIcon } from '@radix-ui/react-icons';
import { authStore } from '@/store/auth.store';
import { cn } from '@/lib/utils';

export default function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { verifySession } = authStore();
  const [verifying, setVerifying] = useState(true);
  const { push } = useRouter();
  const pathname = usePathname();

  const handleVerifySession = async () => {
    const token = Cookies.get('token');
    if (token) {
      const isValid = await verifySession(token);
      if (!isValid) {
        Cookies.remove('token');
        if (pathname !== '/') push('/');
      } else {
        if (pathname === '/') push('/dashboard');
      }
    } else if (pathname !== '/') push('/');

    setTimeout(() => {
      setVerifying(false);
    }, 600);
  };

  useEffect(() => {
    handleVerifySession();
  }, []);

  return verifying ? (
    <main className='grid min-h-dvh w-full place-items-center'>
      <ReloadIcon className='h-8 w-8 animate-spin text-green-megallon' />
    </main>
  ) : (
    <main className={cn('relative min-h-dvh w-full p-6 md:p-12', className)}>
      {children}
    </main>
  );
}
