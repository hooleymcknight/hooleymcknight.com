import Head from 'next/head'
import styles from '../styles/Index.module.scss'
import Layout, { siteTitle } from '../components/layout'

import Subnav from '../components/index/subnav/subnav'
import SummaryCard from '../components/index/profileSummary'
import Portfolio from '../components/index/portfolio/portfolio'
import ResumeSection from '../components/index/resumeSection'
import Videos from '../components/index/photos-videos/videos'

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
      <ResumeSection className={styles.resume} />
      <Videos className={styles.videos} />

    </Layout>
  )
}