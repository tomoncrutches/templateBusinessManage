import { TableCell, TableRow } from './ui/table';

import { DateForTableCell } from './date-item';
import { ExpenseIcon } from './icons/expense-icon';
import { IncomeIcon } from './icons/income-icon';
import { Skeleton } from './ui/skeleton';
import { Transaction } from '@/types/transaction.types';

export const TransactionItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-48' />
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-32' />
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-32' />
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-24' />
      </TableCell>
    </TableRow>
  );
};

type Props = {
  data: Transaction;
  date: Date;
};

export const TransactionItem = ({ data, date }: Props) => {
  return (
    <TableRow>
      <TableCell>{data.name}</TableCell>
      <TableCell className='flex items-center gap-4'>
        {data.value > 0 ? <IncomeIcon size={22} /> : <ExpenseIcon size={22} />}
        <span>$ {data.value.toLocaleString('ES-AR')}</span>
      </TableCell>
      <DateForTableCell date={date} />
      <TableCell>{data.type}</TableCell>
    </TableRow>
  );
};
