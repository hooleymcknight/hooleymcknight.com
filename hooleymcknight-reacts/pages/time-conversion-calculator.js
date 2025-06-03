import Head from 'next/head';
import styles from '../styles/projects/TimeCalc.module.scss';
import Layout, { siteTitle } from '../components/layout';
import TimeCalc from '../components/timeCalc/timeCalc';


export default function TimeCalcPage() {
  return (
    <Layout page='time-conversion-calculator'>
      <Head>
        <title>{`${siteTitle} || Time Conversion Calculator`}</title>
        <meta name="description" content="A time conversion calculator to help out with confusing time zone things." />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="A time conversion calculator to help out with confusing time zone things." />
      </Head>

      <TimeCalc className={styles['time-calc']} />

    </Layout>
  );
}
