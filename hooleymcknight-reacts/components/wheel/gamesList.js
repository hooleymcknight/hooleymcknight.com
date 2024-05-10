import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

const GamesList = (props) => {
  const gamesData = props.gamesData; // all games

  const toggleGameAllowance = (e) => {
    const gameTitle = e.target.dataset.game;
    const prevActiveSetting = e.target.dataset.active;
    props.onApply('game', gameTitle, prevActiveSetting);
  }

  return (
    <div className={props.className}>
      {gamesData.map(x =>
        <button 
          onClick={e => toggleGameAllowance(e)} 
          key={x.title} 
          data-game={x.title} 
          data-active={!props.disallowedGames.includes(x) && !props.filteredOutGames.includes(x)}
          disabled={!props.gamesRemovable && !props.disallowedGames.includes(x)}
          data-player-range={`${x['min_players']},${x['max_players']}`}
          data-valid-player-count={x['min_players'] <= props.numberOfPlayers && x['max_players'] >= props.numberOfPlayers}
          // data-available={`${props.availableGames.includes(x)}`}
        >
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