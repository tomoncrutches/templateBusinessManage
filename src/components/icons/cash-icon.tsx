export default function CashIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-cash-banknote'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='#FCFAF8'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
      <path d='M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
      <path d='M18 12l.01 0' />
      <path d='M6 12l.01 0' />
    </svg>
  );
}
