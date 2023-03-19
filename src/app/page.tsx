import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const data = {
    title: 'IWDD (vol.183) / オンライン開催 14:00〜',
    room: 'オンライン開催 ()',
    date: '2022.03.12 14:00 - 17:00',
    price: {
      adult: '500円',
      student: '無料',
    },
    themes: ['募集中'],
    url: 'https://iwdd.connpass.com/event/198964/',
  }
  return (
    <main className="container mx-auto px-4 text-center text-sm subpixel-antialiased md:px-20 lg:px-40">
      <h1 className="mx-auto w-1/2 py-12 opacity-80 md:w-1/3">
        <Image
          src="/iwdd_logo.svg"
          alt="IWDD Logo"
          width="384"
          height="90"
          className="opacity-80"
        />
      </h1>
      <h2 className="border-t py-10 text-iwdd">{data.title}</h2>
      <dl>
        <dt className="pt-4 text-iwdd">会場</dt>
        <dd>{data.room}</dd>
        <dt className="pt-4 text-iwdd">開催日</dt>
        <dd>{data.date}</dd>
        <dt className="pt-4 text-iwdd">参加費</dt>
        <dd>
          <dl className="grid grid-cols-2 grid-rows-1 gap-x-2">
            <dt className="place-self-end">社会人</dt>
            <dd className="place-self-start">{data.price.adult}</dd>
            <dt className="place-self-end">学生</dt>
            <dd className="place-self-start">{data.price.student}</dd>
          </dl>
        </dd>
        <dt className="pt-4 text-iwdd">今月のお題</dt>
        <dd>
          <ul>
            {data.themes.map((d, i) => {
              return <li key={i}>{d}</li>
            })}
          </ul>
        </dd>
        <dt className="pt-4 text-iwdd">参加申し込み</dt>
        <dd>
          <Link href={data.url} className="underline hover:no-underline">
            {data.url}
          </Link>
        </dd>
      </dl>
    </main>
  )
}
