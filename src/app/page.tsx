import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
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
      <h2 className="text-xl text-iwdd">
        IWDD (vol.183) / オンライン開催 14:00〜
      </h2>
      <dl className="text-sm">
        <dt className="text-iwdd">会場</dt>
        <dd>オンライン開催 ()</dd>
        <dt className="text-iwdd">開催日</dt>
        <dd>2022.03.12 14:00 - 17:00</dd>
        <dt className="text-iwdd">参加費</dt>
        <dd>社会人500円・学生無料</dd>
        <dt className="text-iwdd">今月のお題</dt>
        <dd>募集中</dd>
        <dt className="text-iwdd">参加申し込み</dt>
        <dd>
          <Link href="https://iwdd.connpass.com/event/198964/">
            https://iwdd.connpass.com/event/198964/
          </Link>
        </dd>
      </dl>
    </main>
  )
}
