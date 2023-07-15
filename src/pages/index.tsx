import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { parse } from 'node-html-parser'

import type { ConnpassEvent, ConnpassEvents } from '@/types/connpass'
import type { HomeProps } from '@/types/home'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

const Home: NextPage<HomeProps> = ({ event }) => {
  return (
    <>
      <Head>
        <title>IWDDはWebデザインとWeb開発のローカルコミュニティー</title>
        <meta
          name="description"
          content="毎月第2土曜日に WEB系の最先端の勉強会を 岩手県盛岡市で開催しています。"
        />
      </Head>
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
        <h2 className="border-t py-10 text-iwdd">{event.title}</h2>
        <dl>
          <dt className="pt-4 text-iwdd">会場</dt>
          <dd>{event.place}</dd>
          <dt className="pt-4 text-iwdd">開催日</dt>
          <dd>{event.date}</dd>
          <dt className="pt-4 text-iwdd">参加費</dt>
          <dd>
            <dl className="grid grid-cols-2 grid-rows-1 gap-x-2">
              <dt className="place-self-end">社会人</dt>
              <dd className="place-self-start">{event.price.adult}</dd>
              <dt className="place-self-end">学生</dt>
              <dd className="place-self-start">{event.price.student}</dd>
            </dl>
          </dd>
          <dt className="pt-4 text-iwdd">今月のお題</dt>
          <dd>
            <ul>
              {event.themes.map((d, i) => {
                return <li key={i}>{d}</li>
              })}
            </ul>
          </dd>
          <dt className="pt-4 text-iwdd">参加申し込み</dt>
          <dd>
            <Link
              href={event.event_url}
              className="underline hover:no-underline"
            >
              {event.event_url}
            </Link>
          </dd>
        </dl>
      </main>
    </>
  )
}

export const getStaticProps = async (): Promise<
  { props: HomeProps } | undefined
> => {
  const event = await getNextConnpassEvent()
  const title = event.title
  const place = event.place
  const started_at = dayjs(event.started_at)
    .tz('Asia/Tokyo')
    .format('YYYY.MM.DD HH:mm')
  const ended_at = dayjs(event.ended_at).tz('Asia/Tokyo').format('HH:mm')
  const date = `${started_at} - ${ended_at}`

  const doc = parse(event.description)
  const li = doc.querySelector('ul > li')
  const themes = li ? li?.text.split('\n') : []
  const event_url = event.event_url

  return {
    props: {
      event: {
        title,
        place,
        date,
        price: {
          adult: '500円',
          student: '無料',
        },
        themes,
        event_url,
      },
    },
  }
}

const getNextConnpassEvent = async (): Promise<ConnpassEvent> => {
  const now = dayjs().tz('Asia/Tokyo')

  let event: ConnpassEvent = {
    event_id: 0,
    title: '次回の勉強会は未定です',
    catch: '',
    description:
      '<p>Webに関連する最先端のデザイン系＆技術系な話題をするIT勉強会です。  </p>\n<p>この話したい！この悩みを解決させたい！など大募集！</p>\n<p>その他、突発的なネタ提供も大歓迎！  </p>\n<h2>予習してくるとお悩み共有・解決できるかも。(たまに追記)</h2>\n<ul>\n<li>募集中</li>\n</ul>',
    event_url: 'https://iwdd.net',
    started_at: '未定',
    ended_at: '未定',
    limit: null,
    hash_tag: 'iwdd',
    event_type: 'participation',
    accepted: 1,
    waiting: 0,
    updated_at: '2099-01-01T00:00:00+09:00',
    owner_id: 105582,
    owner_nickname: 'iwdd',
    owner_display_name: 'iwdd',
    place: 'アイーナ 816部屋',
    address: '岩手県盛岡市盛岡駅西通1丁目7番1号',
    lat: '39.701927700000',
    lon: '141.132745400000',
    series: {
      id: 2772,
      title: 'iwdd',
      url: 'https://iwdd.connpass.com/',
    },
  }

  for (let i = 1; i < 12; i++) {
    let yyyymm
    if (now.date() > 14) {
      yyyymm = now.add(i, 'month').format('YYYYMM')
    } else {
      yyyymm = now.format('YYYYMM')
    }
    const response = await fetch(
      `https://connpass.com/api/v1/event/?series_id=2772&count=10&order=2&ym=${yyyymm}`,
    )
    const connpassEvents: ConnpassEvents = await response.json()
    const events: ConnpassEvent[] = connpassEvents.events

    if (events.length !== 0) {
      event = events[0]
      break
    }
  }
  return event
}

export default Home
