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
          <iframe width="560" height="315" src={`https://www.youtube-nocookie.com/embed/${props.video.videoID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default VideoViewer