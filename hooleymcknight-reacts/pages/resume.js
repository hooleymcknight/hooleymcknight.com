import Head from 'next/head'
import styles from '../styles/Resume.module.scss'
import Layout, { siteTitle } from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import ResumeContent from '../components/resumePage/resumeContent'

export default function Resume() {
  return (
    <Layout page='resume'>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <ResumeContent className={styles.resume} />

      <a href="../HollyPhillips_Resume.pdf" download className={styles.floatingDownload}>
        <FontAwesomeIcon icon={faFileDownload} />
        Download PDF here
      </a>

    </Layout>
  )
}
