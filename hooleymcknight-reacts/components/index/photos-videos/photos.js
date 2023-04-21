import { lazy,  useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import data from './media_data.json'

const PhotoViewer = lazy(() => import('./photoViewer'))

const Photos = (props) => {
  const [activePhoto, setActivePhoto] = useState({})
  const [previousFocus, setPreviousFocus] = useState(null)
  const photos = data.photos

  useEffect(() => {
    if (activePhoto.source) {
      document.documentElement.setAttribute('scroll-locked', 'true')
      document.querySelector('.photo-viewer-container button.close-x').focus()
    }
    else {
      document.documentElement.removeAttribute('scroll-locked')
      if (previousFocus) {
        previousFocus.focus()
        setPreviousFocus(null)
      }
    }
  }, [activePhoto])

  const activatePhoto = (e) => {
    if (e.type === 'keypress' && e.key !== 'Enter') return

    const source = e.target.src
    const photo = photos.find(x => `https://hooleymcknight.com${x.tile}` === source)
    setPreviousFocus(e.target)
    setActivePhoto(photo)
  }

  return (
    <div className={props.className} id="photos">
      <h2>Photos</h2>
      {photos.map((x, index) =>
        <LazyLoadImage key={index} src={`https://hooleymcknight.com${x.tile}`} alt={x.alt} tabIndex="0" role="button" aria-label="click to see larger version of photo" onClick={(e) => activatePhoto(e)} onKeyPress={(e) => activatePhoto(e)} />
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
