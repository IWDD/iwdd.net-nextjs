import '@/app/globals.css'

import React from 'react'

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
    <html lang="ja">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
