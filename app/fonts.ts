import localFont from 'next/font/local';

// WOFF2, subset to the Latin range — 255 KB of TTF became ~81 KB.
// Only the two faces used above the fold are preloaded; `display: 'swap'`
// (the next/font default) covers the rest.

export const DMSans400 = localFont({
  src: './fonts/DM Sans/DMSans-Regular.woff2',
  variable: '--font-DMSans-400',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

export const DMSans500 = localFont({
  src: './fonts/DM Sans/DMSans-Medium.woff2',
  variable: '--font-DMSans-500',
  display: 'swap',
  preload: false,
  adjustFontFallback: 'Arial',
})

export const DMSerifReg = localFont({
  src: './fonts/DM Serif Display/DMSerifDisplay-Regular.woff2',
  variable: '--font-DMSerif-Reg',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

export const DMSerifItalic = localFont({
  src: './fonts/DM Serif Display/DMSerifDisplay-Italic.woff2',
  variable: '--font-DMSerif-Italic',
  display: 'swap',
  preload: false,
  adjustFontFallback: 'Times New Roman',
})
