import '@/styles/globals.css'

import { Shippori_Mincho } from 'next/font/google'
import type { ReactNode } from 'react'

const shipporiMincho = Shippori_Mincho({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-shipporiMincho',
  weight: ['400', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'ja'}>
      <body
        className={`${shipporiMincho.variable} font-shipporiMincho subpixel-antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
