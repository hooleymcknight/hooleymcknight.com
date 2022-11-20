import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faCode, faFileAlt, faVideo, faImages } from '@fortawesome/free-solid-svg-icons'

const icons = {
  "Summary": faIdCard,
  "Portfolio": faCode,
  "Resume": faFileAlt,
  "Videos": faVideo,
  "Photos": faImages
}

const SubnavItem = (props) => {

  return (
    <li role="menuitem" className='subnav-item'>
      <Link href={props.link}>
        <a alt={props.name} tabIndex="0">
          <span className="desktop-only">{props.name}</span>
          <span className="mobile-only">
            <FontAwesomeIcon icon={icons[props.name]} />
          </span>
        </a>
      </Link>
    </li>
  )
}

export default SubnavItem