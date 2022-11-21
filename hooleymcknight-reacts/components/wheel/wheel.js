import { useState, useEffect } from 'react'
import { spinWheel } from './wheelEvents'
import gamesData from './games_data.json'

const Wheel = (props) => {
  const [sliceCount, setSliceCount] = useState(gamesData.games.length)
  const [data, setData] = useState(gamesData.games)
  const [spinRot, setSpinRot] = useState(0)

  useEffect(() => {
    const setUpSlices = (sliceCount) => {
      const screenWidth = window.innerWidth
    
      let diameter = 700
      if (screenWidth < 767 && screenWidth > 420) {
        diameter = 450 // fudged this a little, need to re-evaluate all this math
      }
      else if(screenWidth <= 420) {
        diameter = 310 // same as above. hmmmm
      }
    
      let _tempData = [...data]
      _tempData.forEach((sliceData, idx) => {
        const rotation = (360 / sliceCount) * idx
        const sliceHeight = (diameter * Math.PI) / sliceCount

        sliceData['rotation'] = rotation
        sliceData['sliceHeight'] = sliceHeight
      })
      setData([..._tempData])
    }

    setUpSlices(sliceCount)

    window.addEventListener('resize', function(e) {
      const thresholdWidths = [419, 420, 421, 766, 767, 768]
      if(thresholdWidths.includes(window.innerWidth)) {
        // force a re-render
        setUpSlices(sliceCount)
        setSliceCount(sliceCount)
      }
    })
  }, [sliceCount])

  return (
    <div className={props.className}>
      <button className="spinner" tabIndex="0" aria-label="spin the wheel" onClick={(e) => spinWheel(e, sliceCount, setSpinRot)}>
        <span>Spin</span>
      </button>

      <div className="wheel-container" style={{transform: `rotate(${spinRot}deg)`}}>
        {gamesData.games.map((x, index) => 
          <div key={index} className="game-slice" slice-degrees={x.rotation}
            style={{
              backgroundImage: `url(https://hooleymcknight.com/jackbox-wheel/jackbox-tiles/${x.image})`,
              transform: `rotate(${x.rotation}deg)`,
              top: `calc(50% - calc(${x.sliceHeight}px / 2))`,
              height: `${x.sliceHeight}px`
            }}>
              <span className="game-title">{x.title}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wheel