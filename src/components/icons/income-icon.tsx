export const IncomeIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-trending-up'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='#00b341'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 17l6 -6l4 4l8 -8' />
      <path d='M14 7l7 0l0 7' />
    </svg>
  );
};
