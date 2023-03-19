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
    <main>
      <h1>
        <Image
          src="/iwdd_logo.svg"
          alt="IWDD Logo"
          width="384"
          height="90"
          className="opacity-80"
        />
      </h1>
      <h2 className="text-iwdd">{data.title}</h2>
      <dl className="text-sm">
        <dt className="text-iwdd">会場</dt>
        <dd>{data.room}</dd>
        <dt className="text-iwdd">開催日</dt>
        <dd>{data.date}</dd>
        <dt className="text-iwdd">参加費</dt>
        <dd>
          <dl>
            <dt>社会人</dt>
            <dd>{data.price.adult}</dd>
            <dt>学生</dt>
            <dd>{data.price.student}</dd>
          </dl>
        </dd>
        <dt className="text-iwdd">今月のお題</dt>
        <dd>
          <ul>
            {data.themes.map((d, i) => {
              return <li key={i}>{d}</li>
            })}
          </ul>
        </dd>
        <dt>参加申し込み</dt>
        <dd>
          <Link href={data.url}>{data.url}</Link>
        </dd>
      </dl>
    </main>
  )
}
