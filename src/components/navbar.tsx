'use client';

import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import Image from 'next/image';
import NavbarItem from './navbar-item';
import { ROUTES } from '@/const/routes';
import { Separator } from './ui/separator';
import { SignoutDialog } from './signout-dialog';
import UserIcon from './icons/user-icon';
import { authStore } from '@/store/auth.store';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { name, logout } = authStore();
  const { push } = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    Cookies.remove('token');
    logout();
    toast.success('Sesión cerrada con éxito.');
    setLoggingOut(false);
    push('/');
  };

  return (
    <nav
      id='navbar'
      className='fixed z-50 flex h-dvh w-64 -translate-x-full flex-col items-start gap-3 rounded-br-xl rounded-tr-xl bg-primary-foreground p-4 shadow-md duration-200 lg:sticky lg:top-0 lg:translate-x-0'
    >
      <div className='flex w-full items-center justify-between'>
        <Image
          src={'/logo.png'}
          width={88}
          height={88}
          alt='Logo de Megallón'
          quality={100}
          priority
          id='logo'
        />
      </div>
      <ul className='flex w-full flex-col items-start'>
        {ROUTES.slice(0, 4).map((route) => {
          return (
            <NavbarItem
              key={route.path}
              href={route.path}
              icon={<route.icon size={16} />}
              isLink={route.path !== '/no-route'}
              containDropdown={route.name === 'Gestión'}
              dropdownItems={route.paths ?? undefined}
              isActivePath={
                route.name !== 'Gestión'
                  ? pathname === route.path
                  : pathname.includes('products') ||
                    pathname.includes('material')
              }
            >
              {route.name}
            </NavbarItem>
          );
        })}
      </ul>
      <Separator />
      <ul className='flex w-full flex-col items-start'>
        {ROUTES.slice(5, ROUTES.length).map((route) => {
          return (
            <NavbarItem
              key={route.path}
              href={route.path}
              icon={<route.icon size={16} />}
              isLink
              isActivePath={pathname === route.path}
            >
              {route.name}
            </NavbarItem>
          );
        })}
      </ul>
      <Separator />
      <ul className='flex w-full flex-col items-start'>
        {ROUTES.slice(4, 5).map((route) => {
          return (
            <NavbarItem
              key={route.path}
              href={route.path}
              icon={<route.icon size={16} />}
              isLink
              isActivePath={pathname === route.path}
            >
              {route.name}
            </NavbarItem>
          );
        })}
      </ul>
      <ul className='flex w-full grow flex-col items-start justify-end'>
        <div className='flex items-center gap-2 p-1.5'>
          <UserIcon size={16} />
          <span className='text-sm font-medium'>{name}</span>
        </div>
        <SignoutDialog handleLogout={handleLogout} loggingOut={loggingOut} />
      </ul>
    </nav>
  );
}
