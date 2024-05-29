export default function HistoryIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-history'
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
      <path d='M12 8l0 4l2 2' />
      <path d='M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5' />
    </svg>
  );
}
