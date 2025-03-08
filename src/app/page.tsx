import { type Metadata } from 'next'
import Link from 'next/link'

import { formatPrice } from '@/lib/formatPrice'
import { getHomeParams } from '@/lib/getHomeParams'
import { getNextEvent } from '@/lib/getNextEvent'
import { type HomeParams } from '@/types/HomeParams'

export const metadata: Metadata = {
  title: 'IWDDはWebデザインとWeb開発のローカルコミュニティー',
  description:
    '毎月第2土曜日に WEB系の最先端の勉強会を 岩手県盛岡市で開催しています。',
}

const Home = async () => {
  const event = await getNextEvent()
  const params: HomeParams = getHomeParams(event)

  return (
    <main className="container mx-auto px-4 text-center text-sm subpixel-antialiased md:px-20 lg:px-40">
      <h1 className="mx-auto w-1/2 py-12 opacity-80 md:w-1/3">
        <img
          src="/iwdd_logo.svg"
          alt="IWDD Logo"
          width="384"
          height="90"
          className="opacity-80"
        />
      </h1>
      <h2 className="text-iwdd border-t border-t-gray-200 py-10">
        {params.event.title}
      </h2>
      <dl>
        <dt className="text-iwdd pt-4">会場</dt>
        <dd>{params.event.place}</dd>
        <dt className="text-iwdd pt-4">開催日</dt>
        <dd>{params.event.date}</dd>
        <dt className="text-iwdd pt-4">参加費</dt>
        <dd>
          <dl className="grid grid-cols-2 grid-rows-1 gap-x-2">
            <dt className="place-self-end">社会人</dt>
            <dd className="place-self-start">
              {formatPrice(params.event.price.general)}
            </dd>
            <dt className="place-self-end">学生</dt>
            <dd className="place-self-start">
              {formatPrice(params.event.price.student)}
            </dd>
          </dl>
        </dd>
        <dt className="text-iwdd pt-4">今月のお題</dt>
        <dd>
          <ul>
            {params.event.topics.map((d, i) => {
              return <li key={i}>{d}</li>
            })}
          </ul>
        </dd>
        <dt className="text-iwdd pt-4">参加申し込み</dt>
        <dd>
          <Link
            href={params.event.event_url}
            className="underline hover:no-underline"
          >
            {params.event.event_url}
          </Link>
        </dd>
      </dl>
    </main>
  )
}

export default Home
