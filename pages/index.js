import Head from 'next/head'
import Calculator from '../components/Calculator'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hard Drive Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"my-10"}>
        <h1 className={"my-10 text-center text-4xl"}>
          Hard Drive Calculator
        </h1>

        <Calculator />

      </main>

    </div>
  )
}
