export default function SalesIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-package-export'
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
      <path d='M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5' />
      <path d='M12 12l8 -4.5' />
      <path d='M12 12v9' />
      <path d='M12 12l-8 -4.5' />
      <path d='M15 18h7' />
      <path d='M19 15l3 3l-3 3' />
    </svg>
  );
}
