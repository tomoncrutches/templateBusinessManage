export default function PercentageIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-percentage'
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
      <path d='M17 17m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
      <path d='M7 7m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
      <path d='M6 18l12 -12' />
    </svg>
  );
}
