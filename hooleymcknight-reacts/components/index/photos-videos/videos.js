import { useState, useEffect } from 'react'
import VideoSlider from './videosSlider'
import VideoViewer from './videoViewer'

const Videos = (props) => {
  const [activeVideo, setActiveVideo] = useState({})

  return (
    <div className={props.className} id="videos">
      <h2>Video Clips</h2>
      <VideoSlider onVideoSet={(video) => setActiveVideo(video)} />
      {activeVideo.source
      ?
      <VideoViewer video={activeVideo} active='true' onDeactivate={() => {setActiveVideo({})}} />
      :
      ''}
      
    </div>
  )
}

export default Videos
