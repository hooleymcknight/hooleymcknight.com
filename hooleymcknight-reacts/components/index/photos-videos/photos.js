import { useState, useEffect } from 'react'
import PhotoViewer from './photoViewer'

import data from './media_data.json'

const Photos = (props) => {
  const [activePhoto, setActivePhoto] = useState({})
  const photos = data.photos

  useEffect(() => {
    if (activePhoto.source) {
      document.documentElement.setAttribute('scroll-locked', 'true')
    }
    else {
      document.documentElement.removeAttribute('scroll-locked')
    }
  }, [activePhoto])

  const activatePhoto = (e) => {
    if (e.type === 'keyup' && e.key !== 'Enter') return

    const source = e.target.src
    const photo = photos.find(x => `https://hooleymcknight.com${x.tile}` === source)
    setActivePhoto(photo)
  }

  return (
    <div className={props.className} id="photos">
      <h2>Photos</h2>
      {photos.map((x, index) =>
        <img key={index} src={`https://hooleymcknight.com${x.tile}`} alt={x.alt} tabIndex="0" role="button" aria-label="click to see larger version of photo" onClick={(e) => activatePhoto(e)} onKeyUp={(e) => activatePhoto(e)} />
      )}
      {activePhoto.source
      ?
      <PhotoViewer data={photos} active={photos.indexOf(activePhoto)} onDeactivate={() => {setActivePhoto({})}} />
      :
      ''}
    </div>
  )
}

export default Photos
