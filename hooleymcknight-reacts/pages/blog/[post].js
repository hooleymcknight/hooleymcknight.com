import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import styles from '../../styles/Blog.module.scss'

import blogPosts from '../../components/blog/postList.json'

const createMarkup = (input) => {
  return { __html: input}
}

const processText = (text, pageID) => {
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



const Blog = ({ pageContents }) => {
  const router = useRouter()
  // console.log(pageContents)
  console.log(router.asPath)
  
  useEffect(() => {
    // console.log(pageContents)
    console.log('76', router.asPath)
  }, [router.asPath])

  return (
    <Layout page='blog'>
      <Head>
        <title>{siteTitle} || Blog</title>
      </Head>

      <div className={styles.post}>
        <h1 dangerouslySetInnerHTML={createMarkup(pageContents.title)}></h1>
        <h3 dangerouslySetInnerHTML={createMarkup(pageContents.date)}></h3>
        <div className="post-content" dangerouslySetInnerHTML={createMarkup(pageContents.text)}></div>
      </div>

      <Link href="/blog"><a className={styles['go-back']} alt="go back to all blog posts">Go back</a></Link>

    </Layout>
  )
}

export default Blog

export async function getStaticProps({ params: { post } }) {
  const pageContent = await Promise.all([fetchContent(post)])
  const pageContents = JSON.stringify(pageContent)
  console.log('102', pageContents)
  return { props: { pageContents } }
}

export async function getStaticPaths() {
  const [posts] = await Promise.all([getAllBlogPostEntries()])

  const paths = posts.map((c) => {
    return { params: { post: c.route } }
  })

  return {
    paths,
    fallback: false,
  }
}

async function fetchContent(postID) {
  const server = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hooleymcknight.com'
  
  await fetch(`${server}/posts/${postID}.txt`)
    .then((r) => {
      return r.text()
    })
    .then((r) => {
      if (r.includes('{"statusCode":404}')) {
        console.log('404')
        return {
          title: '404',
          date: '',
          page: postID,
          text: 'Page not found.'
        }
      }
      else {
        console.log('137', r)
        return processText(r, postID)
      }
    })
}

async function getAllBlogPostEntries() {
  let postData = []
  Object.keys(blogPosts).forEach((key) => {
    postData.push(blogPosts[key])
  })
  return postData
}