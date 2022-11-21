import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

export default function PrivacyPolicy() {
  return (
    <Layout page='resume'>
      <Head>
        <title>{siteTitle} || Privacy Policy</title>
      </Head>

      <h1>Privacy Policy</h1>
      <p>I do not collect or share personal information, at all, ever. I just want to make fun things on the internet, and I have no use for or interest in anyone's personal information.</p>

    </Layout>
  )
}
