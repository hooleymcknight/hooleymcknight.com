import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

const VideoViewer = (props) => {

  return (
    <div className="video-viewer-container" active={props.active}>
      <div className="overlay" role="button" aria-label="close video viewer" onClick={props.onDeactivate}></div>
      <div className="video-viewer">
        <p className="video-title">{props.video.title}</p>
        <button type="button" className="close-x" aria-label="close video viewer" onClick={props.onDeactivate}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="video">
          <video key={props.video.source} controls>
            <source src={`https://hooleymcknight.com${props.video.source}`} type="video/mp4" />
          </video>
        </div>

      </div>
    </div>
  )
}

export default VideoViewer