import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faCode, faFileAlt, faVideo, faImages, faPencil } from '@fortawesome/free-solid-svg-icons'

const icons = {
  "Summary": faIdCard,
  "Portfolio": faCode,
  "Résumé": faFileAlt,
  "Blog": faPencil,
  "Videos": faVideo,
  "Photos": faImages
}

const SubnavItem = (props) => {
  const [scrollingSection, setScrollingSection] = useState('')

  useEffect(() => {
    // scroll to section on the homepage
    if (scrollingSection.length) {
      let sectionElement = document.querySelector(scrollingSection)
      let scroll_speed = 800
      if (window.innerWidth < 1080 && window.innerWidth > 500) {
          scroll_speed = window.innerWidth
      }
      window.scrollTo(0, sectionElement.offsetTop)
      setScrollingSection('')
    }
  }, [scrollingSection])

  return (
    <li role="menuitem" className='subnav-item'>
      <button type="button" alt={props.name} tabIndex="0" section={props.link} onClick={(e) => { setScrollingSection(e.target.closest('button').getAttribute('section')) }}>
        <span className="desktop-only">{props.name}</span>
        <span className="mobile-only">
          <FontAwesomeIcon icon={icons[props.name]} />
        </span>
      </button>
    </li>
  )
}

export default SubnavItem