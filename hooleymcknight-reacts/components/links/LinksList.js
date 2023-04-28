import Link from 'next/link'
import links from './links_data.json'

const LinksList = () => {

  return (
    <div className="links-list">
      {Object.keys(links).map(x =>
        <Link href={links[x]} alt={x} className="links-btn">{x}</Link>
      )}
    </div>
  )
}

export default LinksList