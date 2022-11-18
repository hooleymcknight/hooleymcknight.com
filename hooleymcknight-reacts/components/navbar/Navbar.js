import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import NavItem from './NavItem'

const mobileMenuHandler = (e) => {
  const doc = e.target.closest('html')
  if (doc.classList.contains('menu-open')) {
    doc.classList.remove('menu-open')
  }
  else {
    doc.classList.add('menu-open')
  }
}

const closeMenu = (e) => {
  const doc = e.target.closest('html')
  doc.classList.remove('menu-open')
}

const Navbar = ({ page }) => {

  return (
    <div className="navbar">
      <nav>
        <Link href="/">Hooley McKnight</Link>

        <button onClick={e => mobileMenuHandler(e)} className="mobile-menu-btn" type="button" aria-label="open menu" aria-controls="menu">
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <ul id="menu" role="menubar" className="social-media-links">
          <NavItem link="https://twitch.tv/hooleymcknight" name="Twitch" />
          <NavItem link="https://instagram.com/hooleymcknight" name="Instagram" />
          <NavItem link="https://youtube.com/c/hooleymcknight" name="YouTube" />
          <NavItem link="https://twitter.com/hooleymcknight" name="Twitter" />
          <NavItem link="https://discord.gg/8MYDjz5" name="Discord" />
          <NavItem link="https://open.spotify.com/user/qyo65dvm8jmh1ondfmx69pa0n?si=QuQbe8kKS1Kke2tRJk1auA" name="Spotify" />
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
