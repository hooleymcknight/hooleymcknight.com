import Head from 'next/head'
import styles from '../styles/Wheel.module.scss'
import Layout, { siteTitle } from '../components/layout'
import Wheel from '../components/wheel/wheel'

export default function WheelPage() {
  return (
    <Layout page='jackbox-wheel'>
      <Head>
        <title>{siteTitle} || Jackbox Wheel</title>
      </Head>

      <Wheel className={styles.wheel} />
      <p className={styles["winner-title"]}></p>

    </Layout>
  )
}
