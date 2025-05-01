import { useState, useEffect } from 'react';
import { spinWheel } from './wheelEvents';

const Wheel = (props) => {
  const gamesData = props.activeGames;
  const [sliceCount, setSliceCount] = useState(gamesData.length);
  const [data, setData] = useState(gamesData);
  const [spinRot, setSpinRotation] = useState(0);

  if (sliceCount !== gamesData.length) setSliceCount(gamesData.length);
  if (data !== gamesData) setData(gamesData);

  const imagePath = props.page === 'tabletop-games' ? 'https://hooleymcknight.com/tabletop-games/tiles/' : 'https://hooleymcknight.com/jackbox-wheel/jackbox-tiles/';

  useEffect(() => {
    const setUpSlices = (sliceCount) => {
      const screenWidth = window.innerWidth;
    
      let diameter = 700;
      if (screenWidth < 767 && screenWidth > 420) {
        diameter = 450;
        // fudged this a little, need to re-evaluate all this math
        // no-- if it ain't broke, don't fix it
      }
      else if(screenWidth <= 420) {
        diameter = 310; // same as above. hmmmm
      }
    
      let _tempData = [...data];
      _tempData.forEach((sliceData, idx) => {
        const rotation = (360 / sliceCount) * idx;
        const sliceHeight = (diameter * Math.PI) / sliceCount;

        sliceData['rotation'] = rotation;
        sliceData['sliceHeight'] = sliceHeight;
      })

      const currentWinner = document.querySelector('.game-slice[winner]');
      if(currentWinner) {
        // currentWinner.removeAttribute('winner');
        // document.querySelector('.wheel-container').removeAttribute('winner');
        // document.querySelector('[class*="winner-title"]').innerText = '';
        props.setWinningGame(currentWinner);
      }
      setData([..._tempData]);
    }

    setUpSlices(sliceCount);

    window.addEventListener('resize', function() {
      const thresholdWidths = [419, 420, 421, 766, 767, 768];
      if(thresholdWidths.includes(window.innerWidth)) {
        // force a re-render
        setUpSlices(sliceCount);
        setSliceCount(sliceCount);
      }
    })
  }, [sliceCount]);

  return (
    <>
      <div className={props.styles.wheel}>
        <button className="spinner" tabIndex="0" aria-label="spin the wheel" onClick={(e) => spinWheel(e, sliceCount, setSpinRotation, props.setWinningGame)}>
          <span>Spin</span>
        </button>

        <div className="wheel-container" style={{transform: `rotate(${spinRot}deg)`}}>
          {gamesData.map((x, index) => 
            <div key={index} className="game-slice" slice-degrees={x.rotation}
              style={{
                backgroundImage: `url(${imagePath}${x.image})`,
                transform: `rotate(${x.rotation}deg)`,
                top: `calc(50% - calc(${x.sliceHeight}px / 2))`,
                height: `${x.sliceHeight}px`
              }}>
                <span className="game-title">{x.title}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wheel;