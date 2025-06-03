const IntroSection = () => {

  return (
    <div className="intro-section">
      <div className="intro-text">
        <h2>Holly M. Phillips</h2>
        <a href="tel:+19364251225" alt="phone number: 936-425-1225">(936) 425-1225</a>
        <a href="mailto:hollymphillips.dev@gmail.com?subject=Hello Holly!&body=I'd love to connect with you..." alt="email address: hollymphillips.dev@gmail.com">hollymphillips.dev@gmail.com</a>
        <a href="https://www.linkedin.com/in/hooleymcknight/" target="_blank" alt="linkedin profile">LinkedIn Profile</a>
        <a href="https://www.github.com/hooleymcknight/" target="_blank" alt="github profile">GitHub Profile</a>
      </div>

      <div className="intro-image">
        <img src="https://hooleymcknight.com/images/pkmn.jpg" alt="Holly wearing a Pokemon t-shirt standing in front of a fence with an open smile" />
      </div>
    </div>
  )
}

export default IntroSection