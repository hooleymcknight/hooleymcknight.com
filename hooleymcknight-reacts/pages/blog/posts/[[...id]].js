import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Layout, { siteTitle } from '../../../components/layout'
import styles from '../../../styles/Blog.module.scss'

const createMarkup = (input) => {
  return { __html: input}
}

const processText = (text, pageID) => {
  console.log(pageID)
  // set the title
  const titleLine = text.split('\n')[0]
  const title = titleLine.replace('Title:', '').trim()

  // set the date
  const dateLine = text.split('\n')[1]
  const date = dateLine.replace('Date:', '').trim()
  
  // remove title, date from the text, and change new lines into actual line breaks
  let _text = text.replace(titleLine, '').replace(dateLine, '').trim()

  // format bolds first
  if (_text.indexOf('**') > -1) {
    let boldSplit = _text.split('**')
    let boldText = ''
    for (let i=0; i < boldSplit.length; i=i+2) {
      if (boldSplit[i + 1]) {
        boldText += boldSplit[i] + '<b>' + boldSplit[i + 1] + '</b>'
      }
      else {
        boldText += boldSplit[i]
      }
    }
    _text = boldText
  }

  // then format italics
  if (_text.indexOf('*') > -1) {
    let italicSplit = _text.split('*')
    let italicText = ''
    for (let i=0; i < italicSplit.length; i=i+2) {
      if (italicSplit[i + 1]) {
        italicText += italicSplit[i] + '<i>' + italicSplit[i + 1] + '</i>'
      }
      else {
        italicText += italicSplit[i]
      }
    }
    _text = italicText
  }

  _text = '<p>' + _text.replaceAll('\n', '<br />') + '</p>'

  let contentObj = {
    title: title,
    date: date,
    page: pageID,
    text: _text
  }
  return contentObj
}

export default function Blog() {
  const [postContent, setPostContent] = useState({})
  const postID = useRouter().asPath.replace('/blog/posts', '').replaceAll('/', '')

  useEffect(() => {
    async function getContent() {
      await fetch(`/posts/${postID}.txt`)
        .then((r) => {
          return r.text()
        })
        .then((r) => {
          if (r.includes('{"statusCode":404}')) {
            setPostContent({
              title: '404',
              date: '',
              page: postID,
              text: 'Page not found.'
            })
          }
          else {
            setPostContent(processText(r, postID))
          }
        })
    }

    // if we havent run the page yet or if the page is still showing up as the variable [...id], get content
    // do not get content if we are on the blog home page.
    if ((!postContent.page || postContent.page === '[[...id]]') && postContent.page !== '') getContent()
  }, [postContent])

  return (
    <Layout page='blog'>
      <Head>
        <title>{siteTitle} || Blog</title>
      </Head>

      <div className={styles.post}>
        <h1>{postContent.title}</h1>
        <h3>{postContent.date}</h3>
        <div className="post-content" dangerouslySetInnerHTML={createMarkup(postContent.text)}></div>
      </div>

      <Link href="/blog"><a className={styles['go-back']} alt="go back to all blog posts">Go back</a></Link>

    </Layout>
  )
}