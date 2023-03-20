import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Shippori_Mincho } from 'next/font/google'

const shipporiMincho = Shippori_Mincho({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-shipporiMincho',
  weight: ['400', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${shipporiMincho.variable} font-shipporiMincho`}>
      <Component {...pageProps} />
    </div>
  )
}
