// https://www.npmjs.com/package/react-responsive-carousel
import { Carousel } from 'react-responsive-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import data from './media_data.json'

const VideoSlider = (props) => {
  const videoData = data.videos

  const setVideoToActive = (e) => {
    const source = e.target.closest('.video-wrapper').getAttribute('data-source')
    const video = videoData.find(x => x.source === `${source}`)
    props.onVideoSet(video)
  }

  return (
    <Carousel className="videos-slider" showThumbs={false} showArrows={true} useKeyboardArrows={true} tabIndex="0" infiniteLoop={true} autoPlay={true} showStatus={false}>
      {videoData.map((x, index) => 
        <div key={index} className="video-wrapper" data-source={`${x.source}`} onClick={(e) => setVideoToActive(e)}>
          <video loop muted playsInline preload="true" className="cover" data-src={`https://hooleymcknight.com${x.source}`}>
            <source src={`https://hooleymcknight.com${x.short}`} type="video/mp4" />
          </video>
          <FontAwesomeIcon icon={faPlayCircle} />
        </div>
      )}
    </Carousel>
  )
}

export default VideoSlider