import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'

export const siteTitle = 'Holly Phillips'

const Layout = ({ children, page }) => {

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Holly's resume, code portfolio, and some fun other things"
        />
        <meta
          property="og:image"
          content={`https://hooleymcknight.com/images/lax_hero.jpg`} // image
        />
        <meta name="og:title" content="Holly's resume, code portfolio, and some fun other things" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar page={page} />

      <main id={page}>
        {children}
      </main>

    </div>
  )
}

export default Layout