// https://www.npmjs.com/package/react-responsive-carousel
import { Carousel } from 'react-responsive-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const PhotoViewer = (props) => {
  const photosData = props.data
  const activeIndex = props.active

  return (
    <div className="photo-viewer-container" active={props.active}>
      <div className="overlay" role="button" aria-label="close photo viewer" onClick={props.onDeactivate}></div>
      <div className="photo-viewer">
        <button type="button" className="close-x" aria-label="close photo viewer" onClick={props.onDeactivate}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <Carousel className="photo-slider" selectedItem={activeIndex} dynamicHeight={true} showThumbs={false} showArrows={true} useKeyboardArrows={true} tabIndex="0" infiniteLoop={true} showStatus={false}>
          {photosData.map((x, index) => 
            <div key={index} className="photo-wrapper">
              <img src={`https://hooleymcknight.com${x.source}`} alt={x.alt} />
              <p>{x.caption}</p>
            </div>
          )}
        </Carousel>

      </div>
    </div>
  )
}

export default PhotoViewer