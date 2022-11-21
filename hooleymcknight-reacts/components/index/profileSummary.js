import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const SummaryCard = (props) => {

  return (
    <div className={props.className} id="summary">
      <div className="summary-profile">
          <h1 className="mobile-only">Holly M. Phillips</h1>
          <img className="summary-img" src="https://hooleymcknight.com/images/pkmn.jpg" alt="Holly wearing a Pokemon t-shirt standing in front of a fence with an open smile" />
      </div>
      <div className="summary-titles">
          <h1 className="desktop-only">Holly M. Phillips</h1>
          <ul>
              <li><FontAwesomeIcon icon={faCircleNotch} /> Web Developer</li>
              <li><FontAwesomeIcon icon={faCircleNotch} /> Funny Person</li>
              <li><FontAwesomeIcon icon={faCircleNotch} /> Creative Writer</li>
              <li><FontAwesomeIcon icon={faCircleNotch} /> Video Editor</li>
          </ul>
      </div>
      <div className="contact-info">
          <p><b>Email:  </b><Link href="mailto:hmphillips93@gmail.com"><a tabIndex="0" alt="Holly's email">hmphillips93@gmail.com</a></Link></p>
          <p><b>Phone:  </b><Link href="tel:+19364251225"><a tabIndex="0" alt="Holly's cell phone number">(936) 425-1225</a></Link></p>
      </div>
    </div>
  )
}

export default SummaryCard
