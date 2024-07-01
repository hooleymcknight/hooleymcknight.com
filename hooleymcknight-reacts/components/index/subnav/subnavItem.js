import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faCode, faFileAlt, faVideo, faImages, faPencil, faGamepad, faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const icons = {
  "Summary": faIdCard,
  "Portfolio": faCode,
  "Résumé": faFileAlt,
  "Blog": faPencil,
  // "Videos": faVideo,
  // "Photos": faImages
  "Jackbox Wheel": faGamepad,
  // "Kenku Kenku": faDiceD20,
}

const SubnavItem = (props) => {
  const [scrollingSection, setScrollingSection] = useState('');

  const subnavClickHandler = (e) => {
    const button = e.target.closest('button');
    if (button.getAttribute('section').includes('#')) {
      setScrollingSection(button.getAttribute('section'));
    }
    else {
      console.log('navigate to:', button.getAttribute('section'));
    }
  }

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
      {props.link.includes('#')
        ?
          <button type="button" alt={props.name} tabIndex="0" section={props.link} onClick={(e) => { subnavClickHandler(e) }}>
            <span className="desktop-only">{props.name}</span>
            <span className="mobile-only">
              <FontAwesomeIcon icon={icons[props.name]} />
            </span>
          </button>
        : 
          <a href={props.link} alt={props.name} tabIndex="0">
            <span className="desktop-only">{props.name}</span>
            <span className="mobile-only">
              <FontAwesomeIcon icon={icons[props.name]} />
            </span>
          </a>
      }
    </li>
  )
}

export default SubnavItem