import localFont from 'next/font/local';

export const DMSans = localFont({
  src: [
    {
      path: './fonts/DM Sans/DMSans-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/DM Sans/DMSans-Medium.ttf',
      weight: '500',
      style: 'normal'
    }
  ]
})

export const DMSans400 = localFont({
  src: './fonts/DM Sans/DMSans-Regular.ttf',
  variable: '--font-DMSans-400'
})

export const DMSans500 = localFont({
  src: './fonts/DM Sans/DMSans-Medium.ttf',
  variable: '--font-DMSans-500'
})

export const DMSerifDisplay = localFont({
  src: [
    {
      path: './fonts/DM Serif Display/DMSerifDisplay-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/DM Serif Display/DMSerifDisplay-Italic.ttf',
      weight: '400',
      style: 'italic'
    }
  ]
})