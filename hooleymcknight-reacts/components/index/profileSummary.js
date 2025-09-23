import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const SummaryCard = (props) => {

    const sendText = () => {
        const phone = '+19364251225';
        const message = "Hi Holly!";
        window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
    }

  return (
    <div className={props.className} id="summary">
      <div className="summary-inner">
        <h1 className="mobile-only">Holly M. Phillips</h1>
        <div className="summary-profile">
            <img className="summary-img" src="https://hooleymcknight.com/images/brick_wall.jpg" alt="Holly standing in front of a brick wall with an open smile" />
        </div>
        <div className="summary-titles">
            <h1 className="desktop-only">Holly M. Phillips</h1>
            <ul>
                <li><FontAwesomeIcon icon={faCircleNotch} /> Web Developer</li>
                <li><FontAwesomeIcon icon={faCircleNotch} /> Funny Person</li>
                <li><FontAwesomeIcon icon={faCircleNotch} /> Animal Lover</li>
                <li><FontAwesomeIcon icon={faCircleNotch} /> Video Editor</li>
            </ul>
        </div>
        <div className="contact-info">
            <p><b>Email:  </b><Link href="mailto:hollymphillips.dev@gmail.com?subject=Hello Holly!&body=I'd love to connect with you..."><a tabIndex="0" alt="Holly's email">hollymphillips.dev@gmail.com</a></Link></p>
            <p><b>Phone:  </b><Link href="tel:+19364251225"><a tabIndex="0" alt="Holly's cell phone number">(936) 425-1225</a></Link></p>
            {/* <p><b>Text me:  </b><span onClick={sendText}>(936) 425-1225</span></p> */}
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
