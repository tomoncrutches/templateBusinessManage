export default function StatisticsIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-chart-histogram'
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
      <path d='M3 3v18h18' />
      <path d='M20 18v3' />
      <path d='M16 16v5' />
      <path d='M12 13v8' />
      <path d='M8 16v5' />
      <path d='M3 11c6 0 5 -5 9 -5s3 5 9 5' />
    </svg>
  );
}
