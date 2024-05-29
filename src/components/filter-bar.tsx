'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const FilterBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilter = (value: string) => {
    const parsedValue = value.trim();
    const params = new URLSearchParams(searchParams);
    if (parsedValue) params.set('type', parsedValue.toLowerCase());
    else params.delete('type');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={searchParams.get('type')?.toString()}
      onValueChange={(value) => handleFilter(value)}
    >
      <SelectTrigger id='filter' className='max-w-64'>
        <SelectValue placeholder='Seleccione una categoría' />
      </SelectTrigger>
      <SelectContent className='max-w-64'>
        <SelectItem value='all'>Todos</SelectItem>
        <SelectItem value='expense'>Gastos</SelectItem>
        <SelectItem value='income'>Ingresos</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const FilterByTypeBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilter = (value: string) => {
    const parsedValue = value.trim();
    const params = new URLSearchParams(searchParams);
    if (parsedValue) params.set('type', parsedValue);
    else params.delete('type');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={searchParams.get('type')?.toString()}
      onValueChange={(value) => handleFilter(value)}
    >
      <SelectTrigger id='filter' className='max-w-56'>
        <SelectValue placeholder='Seleccione una categoría' />
      </SelectTrigger>
      <SelectContent className='max-w-56'>
        <SelectItem value='Todos'>Todos</SelectItem>
        <SelectItem value='Verduras'>Verduras</SelectItem>
        <SelectItem value='Condimentos'>Condimentos y especias</SelectItem>
        <SelectItem value='Legumbres'>Legumbres y cereales</SelectItem>
        <SelectItem value='Limpieza'>Papeleria y limpieza</SelectItem>
        <SelectItem value='Otros'>Otros</SelectItem>
      </SelectContent>
    </Select>
  );
};
