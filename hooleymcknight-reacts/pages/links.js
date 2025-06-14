import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/pages/Links.module.scss';
import LinksList from '../components/links/LinksList';

export default function Links() {

  return (
    <Layout page='links' className={styles.links}>
      <Head>
        <title>{`${siteTitle} || Links`}</title>
        <meta name="description" content="Links to Holly's social media." />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Links to Holly's social media." />
      </Head>

      <img className="links-img" src="https://hooleymcknight.com/images/pkmn.jpg" alt="Holly wearing a Pokemon t-shirt standing in front of a fence with an open smile" />
      <LinksList />

    </Layout>
  );
}
