import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { Title } from './ui/title';
import { cookies } from 'next/headers';
import { getBalance } from '@/services/transaction.service';

export const FinancesBalanceContainerSkeleton = () => {
  return (
    <div className='flex w-full flex-wrap items-end justify-between gap-4'>
      <Skeleton className='h-8 w-40' />
      <Skeleton className='h-6 w-48' />
    </div>
  );
};

export default async function FinancesBalanceContainer() {
  const firstDayOfTheCurrentMonth = new Date();
  firstDayOfTheCurrentMonth.setDate(1);
  firstDayOfTheCurrentMonth.setHours(0, 0, 0, 0);

  const timestamp = firstDayOfTheCurrentMonth.getTime();

  const token = cookies().get('token');

  const data = await getBalance(timestamp, token?.value as string);

  if (data instanceof Error)
    return <SmallTypography>{data.message}</SmallTypography>;
  return (
    <div className='flex w-full flex-wrap items-end justify-between gap-4'>
      <Title>Balance</Title>
      <span className='text-xl lg:text-4xl'>
        ${data.balance.toLocaleString('ES-AR')}
      </span>
    </div>
  );
}
