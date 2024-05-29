'use client';

import { Button } from './ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';

export default function MobileHeader() {
  const handleShow = () => {
    const navbar = document.getElementById('navbar');
    navbar?.classList.toggle('-translate-x-full');
  };

  return (
    <nav className='fixed right-0 top-[10px] z-40 p-4 md:right-8 md:top-[34px] lg:hidden'>
      <Button size={'icon'} variant={'outline'} onClick={handleShow}>
        <ChevronRightIcon className='h-auto w-6' />
      </Button>
    </nav>
  );
}
