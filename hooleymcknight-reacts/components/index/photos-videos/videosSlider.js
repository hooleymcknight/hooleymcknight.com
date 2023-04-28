// https://www.npmjs.com/package/react-responsive-carousel
import { Carousel } from 'react-responsive-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import data from './media_data.json'

const VideoSlider = (props) => {
  const videoData = data.videos

  const setVideoToActive = (e) => {
    const id = e.target.closest('.video-wrapper').getAttribute('data-id')
    const video = videoData.find(x => x.videoID === `${id}`)
    props.onVideoSet(video)
  }

  const clickVideo = (e) => {
    if (e.key !== 'Enter' || !e.target.classList.contains('videos-slider')) return

    const id = e.target.querySelector('.slide.selected .video-wrapper').getAttribute('data-id')
    const video = data.videos.find(x => x.videoID === `${id}`)
    props.onVideoSet(video)
  }

  return (
    <div className="video-slider-container" onKeyUp={e => clickVideo(e)}>
      <Carousel className="videos-slider" showThumbs={false} showArrows={true} useKeyboardArrows={true} infiniteLoop={true} autoPlay={true} showStatus={false}>
        {videoData.map((x, index) => 
          <div key={index} className="video-wrapper" data-id={`${x.videoID}`} onClick={(e) => setVideoToActive(e)}>
            <img src={`http://img.youtube.com/vi/${x.videoID}/0.jpg`} alt={x.title} />
            <FontAwesomeIcon icon={faPlayCircle} />
          </div>
        )}
      </Carousel>
    </div>
  )
}

export default VideoSlider