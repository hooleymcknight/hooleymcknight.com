import Head from 'next/head'
import styles from '../styles/Index.module.scss'
import Layout, { siteTitle } from '../components/layout'

import Subnav from '../components/subnav/subnav'
import SummaryCard from '../components/profileSummary'
import Portfolio from '../components/portfolio/portfolio'

export default function Home() {
  return (
    <Layout page='index'>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={styles['index-hero']}></div>

      <Subnav className={styles.subnav} />
      <SummaryCard className={styles['summary-section']} />
      <Portfolio />

    </Layout>
  )
}
