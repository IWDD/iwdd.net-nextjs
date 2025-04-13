import type { Metadata } from 'next'
import Link from 'next/link'

import RecentTopics from '@/app/components/RecentTopics'
import { formatPrice } from '@/lib/formatPrice'
import { getHomeParams } from '@/lib/getHomeParams'
import { getNextEvent } from '@/lib/getNextEvent'
import type { HomeParams } from '@/types/HomeParams'

export const metadata: Metadata = {
  title: 'IWDDはWebのデザインと開発のローカルコミュニティー',
  description: '毎月第2土曜日に WEB系の勉強会を 岩手県盛岡市で開催しています。',
}

const Home = async () => {
  const event = await getNextEvent()
  const params: HomeParams = getHomeParams(event)

  return (
    <>
      <header className={'mx-auto grid grid-cols-1 justify-items-center'}>
        <h1 className={'my-10 opacity-80'}>
          <img
            src={'/iwdd_logo.svg'}
            alt={'IWDD Logo'}
            className={'w-60 opacity-80'}
          />
        </h1>
      </header>
      <main>
        <section
          className={'mx-auto grid grid-cols-1 justify-items-center text-sm'}
        >
          <h2 className={'my-6 text-xl text-iwdd'}>{params.event.title}</h2>
          <dl className={'grid grid-cols-1 justify-items-center gap-1'}>
            <dt className={'mt-4 text-iwdd'}>会場</dt>
            <dd>{params.event.place}</dd>
            <dt className={'mt-4 text-iwdd '}>開催日</dt>
            <dd>{params.event.date}</dd>
            <dt className={'mt-4 text-iwdd '}>参加費</dt>
            <dd>
              <dl className={'grid grid-cols-2 grid-rows-1 gap-x-2'}>
                <dt className={'place-self-end'}>社会人</dt>
                <dd className={'place-self-start'}>
                  {formatPrice(params.event.price.general)}
                </dd>
                <dt className={'place-self-end'}>学生</dt>
                <dd className={'place-self-start'}>
                  {formatPrice(params.event.price.student)}
                </dd>
              </dl>
            </dd>
            <dt className={'mt-4 text-iwdd '}>今月のお題</dt>
            <dd>
              <ul>
                {params.event.topics.map((d, i) => {
                  return <li key={i}>{d}</li>
                })}
              </ul>
            </dd>
            <dt className={'mt-4 text-iwdd '}>参加申し込み</dt>
            <dd>
              <Link
                href={params.event.event_url}
                className={'underline hover:no-underline'}
              >
                {params.event.event_url}
              </Link>
            </dd>
          </dl>
        </section>
        <div
          className={'mx-auto my-10 w-11/12 border-t-1 border-t-gray-200'}
        ></div>
        <section className={'my-10 grid grid-cols-1 justify-items-center px-1'}>
          <RecentTopics />
        </section>
      </main>
    </>
  )
}

export default Home
