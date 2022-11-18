import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faTwitch, faYoutube, faDiscord, faSpotify } from '@fortawesome/free-brands-svg-icons'

const medias = {
  "Instagram": faInstagram,
  "Twitch": faTwitch,
  "Twitter": faTwitter,
  "YouTube": faYoutube,
  "Discord": faDiscord,
  "Spotify": faSpotify
}

const NavItem = (props) => {

  return (
    <li role="menuitem" className='nav-item'>
      <Link href={props.link} alt={props.name}>
        <FontAwesomeIcon icon={medias[props.name]} />
      </Link>
    </li>
  )
}

export default NavItem
