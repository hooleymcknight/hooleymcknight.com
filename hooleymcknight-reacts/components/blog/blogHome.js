import Link from 'next/link'
import styles from '../../styles/Blog.module.scss'
import postList from './postList.json'

const BlogHome = (props) => {
  console.log(postList)
  console.log(props.page)

  return (
    <div className={styles['blog-home']} id="blog">
      {props.page === 'blog' ? <h1>Hooley Writes</h1> : <h2>Blog</h2>}

      <ul>
        {Object.keys(postList).map((x, index) =>
        
        <li key={index}>
          {props.page === 'index' && index > 5
          ?
          ''
          :
          
            <Link href={`/blog/posts/${x}`}>
              <a>
                <img src={`../posts/${postList[`${x}`].image}`} alt={postList[`${x}`].title} />
                <p className="blog-title">{postList[`${x}`].title}</p>
                <p className="blog-date">{postList[`${x}`].date}</p>
                <p className="blurb">{postList[`${x}`].blurb}</p>
              </a>
            </Link>
          
          }
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogHome