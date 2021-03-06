import Head from 'next/head'
import Calculator from '../components/Calculator'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hard Drive Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-10">
        <Calculator />
      </main>

    </div>
  )
}
