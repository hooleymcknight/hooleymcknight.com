import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faTwitch, faYoutube, faDiscord, faSpotify, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { useEffect } from 'react'

const medias = {
  "Instagram": faInstagram,
  "Twitch": faTwitch,
  "Twitter": faTwitter,
  "YouTube": faYoutube,
  "Discord": faDiscord,
  "LinkedIn": faLinkedin,
  "Spotify": faSpotify,
  "GitHub": faGithub
}

const NavItem = (props) => {
  
  return (
    <li role="menuitem" className='nav-item'>
      <Link href={props.link}>
        <a alt={props.name} tabIndex="0" target="_blank"> <FontAwesomeIcon icon={medias[props.name]} /> </a>
      </Link>
    </li>
  )
}

export default NavItem
