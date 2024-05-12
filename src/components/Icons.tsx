import { LucideProps } from 'lucide-react'

export const Icons = {
  logo: (props: LucideProps) => (
    // <svg
    //   xmlns='http://www.w3.org/2000/svg'
    //   viewBox='0 0 24 24'
    //   fill='none'
    //   stroke='currentColor'
    //   strokeWidth='2.5'
    //   {...props}
    //   strokeLinecap='round'
    //   strokeLinejoin='round'
    //   className='lucide lucide-laptop'
    //   x='0px'
    //   y='0px'
    // >
    //   <path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' />
    // </svg>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-square-parking '
      {...props}
      x='0px'
      y='0px'
      enableBackground='new 0 0 32 32'
      xmlSpace='preserve'
    >
      <path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' />
    </svg>
  ),
  lost: (props: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-shield-off'
      {...props}
    >
      <path d='m2 2 20 20' />
      <path d='M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71' />
      <path d='M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264' />
    </svg>
  ),
}
