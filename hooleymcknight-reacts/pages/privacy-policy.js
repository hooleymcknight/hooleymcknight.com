import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/PrivacyPolicy.module.scss';

export default function PrivacyPolicy() {
  return (
    <Layout page='privacy-policy'>
      <Head>
        <title>{`${siteTitle} || Privacy Policy`}</title>
        <meta name="description" content="This is the shortest privacy policy you'll ever read." />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="This is the shortest privacy policy you'll ever read." />
      </Head>

      <div class={styles["privacy-policy"]}>
        <h1>Privacy Policy</h1>
        <p>I do not collect or share personal information, at all, ever. I just want to make fun things on the internet, and I have no use for or interest in anyone's personal information.</p>
      </div>

    </Layout>
  );
}
