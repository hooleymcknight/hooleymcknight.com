import Head from 'next/head';
import styles from '../styles/Index.module.scss';
import Layout, { siteTitle } from '../components/layout';

import Subnav from '../components/index/subnav/subnav';
import SummaryCard from '../components/index/profileSummary';
import Portfolio from '../components/index/portfolio/portfolio';
import ResumeSection from '../components/index/resumeSection';
import BlogHome from '../components/blog/blogHome';
import Videos from '../components/index/photos-videos/videos';
import Photos from '../components/index/photos-videos/photos';

export default function Home() {
  return (
    <Layout page='index'>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Holly's resume, code portfolio, and some fun other things" />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Holly's resume, code portfolio, and some fun other things" />
      </Head>

      <div className={styles['index-hero']}></div>

      <Subnav className={styles.subnav} />
      <SummaryCard className={styles['summary-section']} />
      <Portfolio />
      <ResumeSection className={styles.resume} />
      <BlogHome className={styles.blog} page='index' />
      {/* <Videos className={styles.videos} />
      <Photos className={styles.photos} /> */}

    </Layout>
  )
}