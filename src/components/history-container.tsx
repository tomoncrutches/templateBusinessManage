import HistoryItem, { HistoryItemSkeleton } from './history-item';

import { History } from '@/types/history.types';
import { Separator } from './ui/separator';
import { SmallTypography } from './ui/small-typography';
import { cookies } from 'next/headers';
import { getAll } from '@/services/history.service';

export const HistoryContainerSkeleton = () => {
  return (
    <div className='flex flex-col gap-8 py-8'>
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
    </div>
  );
};

export default async function HistoryContainer({ query }: { query?: string }) {
  const token = cookies().get('token');
  const history: History[] | Error = await getAll(token?.value as string);

  const filteredHistory = query
    ? history instanceof Array &&
      history.filter((log) => {
        if (log.action.toLowerCase().includes(query.toLowerCase())) return true;
        if (new Date(log.date).toLocaleDateString('ES-AR').includes(query))
          return true;
        if (log.user.name?.toLowerCase().includes(query.toLowerCase()))
          return true;
      })
    : history;

  return (
    <div className='flex flex-col gap-8 py-8'>
      {history instanceof Error ? (
        <SmallTypography>{history.message}</SmallTypography>
      ) : (filteredHistory as History[])?.length > 0 ? (
        (filteredHistory as History[])?.map((item, index) => {
          if (index === history.length - 1) {
            return <HistoryItem key={item.id} data={item} />;
          } else {
            return (
              <>
                <HistoryItem key={item.id} data={item} />
                <Separator />
              </>
            );
          }
        })
      ) : (
        <SmallTypography>El historial está vacío.</SmallTypography>
      )}
    </div>
  );
}
