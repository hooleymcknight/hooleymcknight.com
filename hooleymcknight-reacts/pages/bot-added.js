import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import BotAdded from '../components/bots/botAdded'

export default function BotAddedPage() {

  return (
    <Layout page='bot-added'>
      <Head>
        <title>Bot Added! || HooleyMcKnight</title>
      </Head>

      <BotAdded />

    </Layout>
  )
}