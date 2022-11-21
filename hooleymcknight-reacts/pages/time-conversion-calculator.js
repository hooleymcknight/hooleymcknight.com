import Head from 'next/head'
import styles from '../styles/TimeCalc.module.scss'
import Layout, { siteTitle } from '../components/layout'
import TimeCalc from '../components/timeCalc/timeCalc'


export default function TimeCalcPage() {
  return (
    <Layout page='time-conversion-calculator'>
      <Head>
        <title>{siteTitle} || Time Conversion Calculator</title>
      </Head>

      <TimeCalc className={styles['time-calc']} />

    </Layout>
  )
}
