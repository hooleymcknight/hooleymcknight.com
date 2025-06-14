import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/pages/Links.module.scss';
import Link from 'next/link';
import LinkWithQR from '../components/links/LinkWithQR';

export default function Donate() {

  return (
    <Layout page='donation-links' className={styles.links}>
      <Head>
        <title>{`${siteTitle} || Donation Links`}</title>
        <meta name="description" content="Ways to donate through Holly" />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Ways to donate through Holly" />
      </Head>

      <img className="links-img" src="https://hooleymcknight.com/images/pkmn.jpg" alt="Holly wearing a Pokemon t-shirt standing in front of a fence with an open smile" />
      <h1>Ways to Donate</h1>

      <div className="links-list">
        <Link href="https://streamelements.com/hooleymcknight/tip" alt="StreamElements" className="links-btn">StreamElements</Link>

        <LinkWithQR href="https://paypal.me/hooleymcknight" text="PayPal" />
        <LinkWithQR href="https://venmo.com/hooleymcknight" text="Venmo" />
        <LinkWithQR href="https://gpay.app.goo.gl/cb5FQ8" text="Google Pay" />

        <p className="links-btn">Zelle number: 936-425-1225</p>
      </div>

    </Layout>
  );
}
