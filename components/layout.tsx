import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>IWDDはWebデザインとWeb開発のローカルコミュニティー</title>
        <meta name="description" content="毎月第2土曜日に WEB系の最先端の勉強会を 岩手県盛岡市で開催しています" />
      </Head>
      <Nav />
      <main className={"container ps-10"}>{children}</main>
      <Footer />
    </>
  )
}
