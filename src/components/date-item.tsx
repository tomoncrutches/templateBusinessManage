'use client';

import { SmallTypography } from './ui/small-typography';
import { TableCell } from './ui/table';

type Props = {
  date: Date;
};

export const DateForHistoryItem = ({ date }: Props) => {
  return (
    <SmallTypography className='text-nowrap !text-xs sm:!text-sm'>
      {date.toLocaleDateString('es-AR')}{' '}
      {date.toLocaleTimeString('es-AR', {
        hour12: false,
      })}
    </SmallTypography>
  );
};

export const DateForTableCell = ({ date }: Props) => (
  <TableCell>{date.toLocaleDateString('es-AR')}</TableCell>
);
