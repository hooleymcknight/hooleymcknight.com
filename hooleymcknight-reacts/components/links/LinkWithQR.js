import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const LinkWithQR = (props) => {
  const [qrShown, setQrShown] = useState(false)

  function openPopUp() {

  }

  return (
    <div className="link-with-qr">
      <Link href={props.href} alt={props.text} className="links-btn">{props.text}</Link>
      <button role="button" className="qr-btn" onClick={() => { setQrShown(true) }}> <FontAwesomeIcon icon={faQrcode} /> </button>
      
      {
        qrShown
        ?
          <div className="popup-qr">
            <div className="overlay" onClick={() => { setQrShown(false) }}></div>
            <div className="modal">
              <button type="button" className="close-x" aria-label="close QR code" onClick={() => { setQrShown(false) }}>
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <img src={`https://hooleymcknight.com/images/qr/${props.text.replaceAll(' ', '')}QR.jpg`} alt={props.text} />
            </div>
          </div>
        :
        ''
      }
    </div>
  )
}

export default LinkWithQR