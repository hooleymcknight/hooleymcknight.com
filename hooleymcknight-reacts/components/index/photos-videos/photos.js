import { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PhotoViewer from './photoViewer'

import data from './media_data.json'

const Photos = (props) => {
  const [viewerStatus, setViewerStatus] = useState({
    photo: {},
    focus: null,
  })
  const photos = data.photos

  useEffect(() => {
    if (viewerStatus.photo.source) {
      document.documentElement.setAttribute('scroll-locked', 'true')
      document.querySelector('.photo-viewer-container button.close-x').focus()
    }
    else {
      document.documentElement.removeAttribute('scroll-locked')
      if (viewerStatus.focus) {
        viewerStatus.focus.focus()
        setViewerStatus({
          photo: viewerStatus.photo,
          focus: null,
        })
      }
    }
  }, [viewerStatus])

  const activatePhoto = (e) => {
    if (e.type === 'keypress' && e.key !== 'Enter') return

    const source = e.target.src
    const photo = photos.find(x => `https://hooleymcknight.com${x.tile}` === source)
    setViewerStatus({
      photo: photo,
      focus: e.target
    })
  }

  return (
    <div className={props.className} id="photos">
      <h2>Photos</h2>
      {photos.map((x, index) =>
        <LazyLoadImage key={index} src={`https://hooleymcknight.com${x.tile}`} alt={x.alt} tabIndex="0" role="button" aria-label="click to see larger version of photo" onClick={(e) => activatePhoto(e)} onKeyPress={(e) => activatePhoto(e)} />
      )}
      {viewerStatus.photo.source
      ?
      <PhotoViewer data={photos} active={photos.indexOf(viewerStatus.photo)} onDeactivate={() => {setViewerStatus({ photo: {}, focus: viewerStatus.focus })}} />
      :
      ''}
    </div>
  )
}

export default Photos
