import { ReactNode } from 'react';

export function Subtitle({ children }: { children: ReactNode }) {
  return (
    <h2 className='scroll-m-20 text-lg font-semibold leading-5 tracking-tight first:mt-0 sm:text-xl sm:leading-7 md:text-3xl md:leading-normal'>
      {children}
    </h2>
  );
}
