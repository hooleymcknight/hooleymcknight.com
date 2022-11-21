import { useState, useEffect } from 'react'
import PhotoViewer from './photoViewer'

const Videos = (props) => {
  const [activeVideo, setActiveVideo] = useState({})

  return (
    <div className={props.className} id="photos">
      <h2>Photos</h2>
      
    </div>
  )
}

export default Videos
