import '@/app/globals.css'

import { Shippori_Mincho } from 'next/font/google'
import React from 'react'

const shipporiMincho = Shippori_Mincho({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-shipporiMincho',
  weight: ['400', '700'],
})

export const metadata = {
  title: 'IWDDはWebデザインとWeb開発のローカルコミュニティー',
  description:
    '毎月第2土曜日に WEB系の最先端の勉強会を 岩手県盛岡市で開催しています。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${shipporiMincho.variable}`}>
      <body className="font-shipporiMincho">{children}</body>
    </html>
  )
}
