import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout';

export default function UhOh() {

  return (
    <Layout page='uh-oh'>
      <Head>
        <title>{`${siteTitle} || Uh Oh`}</title>
        <meta name="description" content="Surely you don't mean this." />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Surely you don't mean this." />
      </Head>

      <main style={{margin: '0 40px 60px'}}>
        <h1 style={{margin: '0 auto 20px 0'}}>Ruh roh!</h1>
    
        <img src="https://media1.tenor.com/m/KGRLk_Dfub0AAAAC/scooby-doo-woof.gif" alt="gif of Scooby Doo gulping with text: Ruh Roh" />

        <p>How'd you get here?</p>

        <Link href="/">
            <a style={{fontWeight: 'bold', textDecoration: 'underline'}} alt="home page" tabIndex="0">Head on back to something cooler!</a>
        </Link>

      </main>

    </Layout>
  );
}
