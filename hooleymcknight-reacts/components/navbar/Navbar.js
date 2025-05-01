import Link from 'next/link'

import NavItem from './NavItem'

const Navbar = () => {

  return (
    <nav id="main-nav">
      <Link href="/">
        <a tabIndex="0">Hooley McKnight</a>
      </Link>

      <ul id="menu" role="menubar" className="social-media-links">
        <NavItem link="https://twitch.tv/hooleymcknight" name="Twitch" />
        <NavItem link="https://instagram.com/hooleymcknight" name="Instagram" />
        <NavItem link="https://youtube.com/c/hooleymcknight" name="YouTube" />
        {/* <NavItem link="https://twitter.com/hooleymcknight" name="Twitter" /> */}
        {/* <NavItem link="https://discord.gg/8MYDjz5" name="Discord" /> */}
        <NavItem link="https://www.linkedin.com/in/hooleymcknight/" name="LinkedIn" />
        <NavItem link="https://open.spotify.com/user/qyo65dvm8jmh1ondfmx69pa0n?si=QuQbe8kKS1Kke2tRJk1auA" name="Spotify" />
      </ul>
    </nav>
  )
}

export default Navbar
