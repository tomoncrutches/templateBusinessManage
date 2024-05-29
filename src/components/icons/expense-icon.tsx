export const ExpenseIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-trending-down'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='#ff2825'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 7l6 6l4 -4l8 8' />
      <path d='M21 10l0 7l-7 0' />
    </svg>
  );
};
