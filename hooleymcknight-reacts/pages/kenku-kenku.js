import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/KenkuKenku.module.scss';
// import LinksList from '../components/kenku-kenku/LinksList';

const toJSON = (txt) => {
    let keys = txt.split('\n');
    let JSONobject = {};
    keys.forEach((line) => {
        JSONobject[line.split(' - ')[0]] = line.split(' - ')[1];
    })
    return JSONobject;
}

const KenkuKenku = () => {

    useEffect(() => {
        //
    }, [])

    // const words = fetch('https://hooleymcknight.com/hidden_files/words.json', (res) => {
    //     console.log(res);
    // });

    // const words = fetch(process.cwd() + './components/kenkukenku/words.json')
    // console.log(process.cwd() + '/components')


  return (
    <Layout page='kenku-kenku' className={styles}>
      <Head>
        <title>{`${siteTitle} || Kenku Kenku`}</title>
        <meta name="description" content="Kenku kenku kenku kenku kenku!" />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Kenku kenku kenku kenku kenku!" />
      </Head>

      <p>things</p>

    </Layout>
  );
}

export default KenkuKenku;