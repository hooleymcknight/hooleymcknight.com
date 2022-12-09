import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

const GamesList = (props) => {
  const gamesData = props.gamesData // all games
  const [activeGames, setActiveGames] = useState(props.activeGames) // only the active ones

  const inactive = gamesData.filter(x => activeGames.indexOf(x) === -1)

  if (activeGames !== props.activeGames) setActiveGames(props.activeGames)

  return (
    <div className={props.className}>
      {gamesData.map(x =>
        <button onClick={e => props.onChange(e)} key={x.title} data-game={x.title} data-active={!inactive.filter(y => y.title === x.title).length} disabled={!props.gamesRemovable && !inactive.filter(y => y.title === x.title).length}>
          {x.title}
          <FontAwesomeIcon icon={faTimes} />
          <FontAwesomeIcon icon={faPlus} />
          <span className="disabled-tooltip">You cannot have less than 8 games in the wheel.</span>
        </button>
      )}
    </div>
  )
}

export default GamesList