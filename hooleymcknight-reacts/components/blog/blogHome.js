import Link from 'next/link'
import styles from '../../styles/Blog.module.scss'
import postList from './postList.json'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const BlogHome = (props) => {

  return (
    <div className={styles['blog-home']} id={props.page === 'index' ? 'blog' : 'blog-home'}>
      {props.page === 'blog' ? <h1>Hooley Writes</h1> : <h2>Blog</h2>}

      <ul>
        {Object.keys(postList).map((x, index) =>
        
        <li key={index}>
          {props.page === 'index' && index > 5
          ?
          ''
          :
          
            <Link href={`/blog/${x.replace(/_/g, '-')}`}>
              <a>
                <LazyLoadImage src={`../posts/${postList[`${x}`].image}`} alt={postList[`${x}`].title} />
                <p className="blog-title">{postList[`${x}`].title}</p>
                <p className="blog-date">{postList[`${x}`].date}</p>
                <p className="blurb">{postList[`${x}`].blurb}</p>
              </a>
            </Link>
          }
          </li>
        )}
      </ul>

      {props.page === 'index'
      ?
      <Link href='/blog'><a alt="page with list of all Holly's available blog posts">...more</a></Link>
      :
      ''
      }
    </div>
  )
}

export default BlogHome