import { useEffect } from 'react'
import gamesData from './games_data.json'

const Wheel = () => {

  useEffect(() => {
    document.addEventListener('resize', function(e) {
      const thresholdWidths = [419, 420, 421, 766, 767, 768]
      if(thresholdWidths.includes(window.innerWidth)) {
        // setUpSlices(wheelContainer, sliceCount, halfSliceSize)
      }
    })
  }, [])

  return (
    <div className="wheel-set">
      <div className="spinner"></div>

      <div className="wheel-container">
        {gamesData.games.map((x, index) => 
          <div key={index} className="game-slice"
            style={{
              backgroundImage: `url(https://hooleymcknight.com/jackbox-wheel/jackbox-tiles/${x.image})`
            }}>
              <span class="game-title">{x.title}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wheel