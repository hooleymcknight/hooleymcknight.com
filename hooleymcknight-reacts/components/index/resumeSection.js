import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faFileDownload } from '@fortawesome/free-solid-svg-icons'

const ResumeSection = (props) => {

  return (
    <div className={props.className} id="resume">
      <h2>Résumé</h2>
      <Link href="/resume">
        <a tabIndex="0" alt="link to Holly's online résumé">
          <span>View Online</span>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </Link>

      <a href="/HollyPhillips_Resume.pdf" download tabIndex="0">
        <span>Download PDF Here</span>
        <FontAwesomeIcon icon={faFileDownload} />
      </a>
    </div>
  )
}

export default ResumeSection