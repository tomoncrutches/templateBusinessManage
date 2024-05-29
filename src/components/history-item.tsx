import { CalendarIcon } from './icons/calendar-icon';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { DateForHistoryItem } from './date-item';
import { History } from '@/types/history.types';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

export const HistoryItemSkeleton = () => {
  return (
    <div className='flex w-full gap-3'>
      <Skeleton className='h-10 w-10 self-start rounded-full' />
      <div className='flex w-full flex-col gap-3'>
        <div className='flex items-center gap-6'>
          <Skeleton className='h-3 w-24 rounded-sm' />
          <Skeleton className='h-3 w-32 rounded-sm' />
        </div>
        <div className='flex w-full gap-3'>
          <Skeleton className='h-3 w-48' />
          <div className='flex w-full flex-col gap-3'>
            <Skeleton className='h-2 w-full' />
            <Skeleton className='h-2 w-64' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HistoryItem({ data }: { data: History }) {
  const date = new Date(data.date);
  return (
    <div className='flex w-full gap-3'>
      <Image
        src={'/person.svg'}
        alt='Autor de la acción'
        width={40}
        height={40}
        className='self-start'
      />
      <div className='flex w-full flex-col gap-3'>
        <div className='flex items-center gap-6'>
          <span className='text-nowrap text-sm font-medium sm:text-[16px]'>{`${data.user.name}`}</span>
          <div className='flex items-center gap-1 opacity-50'>
            <CalendarIcon size={16} />
            <DateForHistoryItem date={date} />
          </div>
        </div>
        <div className='flex flex-wrap gap-3 md:flex-nowrap'>
          <span className='min-w-54 text-nowrap text-sm font-bold sm:text-base'>
            {data.action}
          </span>
          <ChevronRightIcon className='min-h-5 min-w-5 sm:min-h-6 sm:min-w-6' />
          <p className='text-sm sm:text-base'>{data.description}</p>
        </div>
      </div>
    </div>
  );
}
