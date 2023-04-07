import Head from 'next/head'
import Layout, {siteTitle} from '../../components/layout'
import BlogHome from '../../components/blog/blogHome'

export default function Blog() {

  return (
    <Layout page='blog'>
      <Head>
        <title>{siteTitle} || Blog</title>
      </Head>

      <BlogHome page='blog' />

    </Layout>
  )
}