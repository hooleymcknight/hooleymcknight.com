import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/layout'

export default function Home() {
  return (
    <Layout className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <main className={styles.main}>
        
      </main>
    </Layout>
  )
}
