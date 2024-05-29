'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({
  placeholder,
  width,
}: {
  placeholder?: string;
  width?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const parsedValue = value.trim();
    const params = new URLSearchParams(searchParams);
    if (parsedValue) params.set('query', parsedValue.toLowerCase());
    else params.delete('query');

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={cn(width ? 'grow' : '')}>
      <Input
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
        className={cn(width ?? 'sm:w-40')}
        placeholder={placeholder ?? 'Buscar'}
      />
    </div>
  );
}
