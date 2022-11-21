import { useState, useEffect } from 'react'
import VideoSlider from './videosSlider'
import VideoViewer from './videoViewer'

const Videos = (props) => {
  const [activeVideo, setActiveVideo] = useState({})

  useEffect(() => {
    if (activeVideo.source) {
      document.documentElement.setAttribute('scroll-locked', 'true')
    }
    else {
      document.documentElement.removeAttribute('scroll-locked')
    }
  }, [activeVideo])

  return (
    <div className={props.className} id="videos">
      <h2>Video Clips</h2>
      <VideoSlider onVideoSet={(video) => setActiveVideo(video)} />
      {activeVideo.source
      ?
      <VideoViewer video={activeVideo} onDeactivate={() => {setActiveVideo({})}} />
      :
      ''}
    </div>
  )
}

export default Videos
