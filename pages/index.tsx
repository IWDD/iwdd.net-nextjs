import Image from 'next/image'
import Layout from '../components/layout'

export default function Index() {
  return (
      <>
        <h1>
          <Image src="/iwdd_logo.svg" alt="IWDD Logo" width={912} height={214} />
        </h1>
        <h2>
          IWDD (vol.183) / オンライン開催 14:00〜
        </h2>
        <dl>
          <dt>
            会場
          </dt>
          <dd>
            オンライン開催 ()
          </dd>
          <dt>
            開催日
          </dt>
          <dd>
            2022.03.12 14:00 - 17:00
          </dd>
          <dt>
            参加費
          </dt>
          <dd>
            社会人500円・学生無料
          </dd>
          <dt>
            今月のお題
          </dt>
          <dd>
            募集中
          </dd>
          <dt>
            参加申し込み
          </dt>
          <dd>
            <a href="https://iwdd.connpass.com/event/198964/" target="_blank" rel="noreferrer">https://iwdd.connpass.com/event/198964/</a>
          </dd>
        </dl>
      </>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
