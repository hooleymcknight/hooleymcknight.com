import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Image from 'next/image'

export default function Beechers() {

  return (
    <Layout page='beechers'>
      <Head>
        <title>{`${siteTitle} || Beecher's World's Best Mac & Cheese Recipe`}</title>
        <meta name="description" content="Make good mac." />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Make good mac." />
      </Head>

      <main style={{ maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h1>Beecher's World's Best Mac & Cheese</h1>
        <p>Serves 6 to 8</p>

        <ul>
            <li>12 oz penne pasta</li>
            <li>1/4 cup unsalted butter</li>
            <li>1/3 cup all-purpose flour</li>
            <li>3 cups milk</li>
            <li>1 lb Beecher's Flagship cheese, grated (about 4 cups)</li>
            <li>4 oz Beecher's Just Jack cheese, grated (about 1 cup)</li>
            <li>1/2 tsp kosher salt</li>
            <li>1/2 tsp chili powder</li>
            <li>1/8 tsp garlic powder</li>
        </ul>

        <p>Preheat oven to 350 degrees F. Butter a 9" x 13" baking dish.</p>
        <p>Bring 4 to 6 quarts of wter to a boil. Add penne, gently stir, and cook for 9 minutes or just until noodles are cooked through but are still chewy. Rinse in cold water and set aside.</p>
        <p>Melt butter in a heavy-bottomed saucepan over medium heat. Whisk in flour. Continue whisking and cook for 2 minutes. Slowly add milk while whisking. Cook until sauce thickens (about 10 minutes), stirring frequently. Remove from heat.</p>
        <p>Add 3-1/2 cups Flagship cheese, 1/2 cup Just Jack cheese, salt, 1/4 tsp chili powder, and garlic powder. Stir until cheese is melted and ingredients are incorporated (about 3 minutes).</p>
        <p>Combine pasta and sauce in a large bowl, mixing carefully. Scrape in to the prepared baking dish. Sprinkle with remaining cheese and chili powder.</p>
        <p>Bake uncovered for 30 minutes. Let Mac & Cheese set for 5 minutes before serving.</p>

        <div style={{textAlign: 'center', marginTop: '40px'}}>
            {/* <Image src="/images/beechers-worldsbest.jpg" width={500} height={800} alt="Picture of the above recipe" /> */}
            <img src="https://hooleymcknight.com/images/beechers-worldsbest.jpg" width="500" alt="Picture of the above recipe" />
        </div>
      </main>

    </Layout>
  );
}
