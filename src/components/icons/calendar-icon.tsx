export const CalendarIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-calendar-check'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='#2c3e50'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6' />
      <path d='M16 3v4' />
      <path d='M8 3v4' />
      <path d='M4 11h16' />
      <path d='M15 19l2 2l4 -4' />
    </svg>
  );
};
