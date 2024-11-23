import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

const GamesList = (props) => {
  const gamesData = props.gamesData; // all games
  const packs = [...new Set(gamesData.map(x => x.pack))];

  const toggleGameAllowance = (e) => {
    const gameTitle = e.target.closest('[data-game]').dataset.game;
    const prevActiveSetting = e.target.closest('[data-active]').dataset.active;
    props.onApply('game', gameTitle, prevActiveSetting);
  }

  const expandDesc = (e) => {
    const currentDescSetting = e.target.closest('[data-description-shown]').dataset.descriptionShown;
    if (currentDescSetting == 'true') {
      e.target.closest('[data-description-shown]').dataset.descriptionShown = false;
    }
    else {
      e.target.closest('[data-description-shown]').dataset.descriptionShown = true;
    }
  }

  return (
    <>
      {packs.map(pack =>
        <div className={props.packClassName} data-description-shown={false} key={pack}>
          <h2>{typeof(pack) === 'Number' ? `Party Pack ${pack}` : `${pack}`}</h2>
          <div className={props.className}>
          {gamesData.filter(data => data.pack == pack).map(x =>
            <div
              className="button-tile"
              data-pack={pack}
              key={x.title} 
              data-game={x.title} 
              data-active={!props.disallowedGames.includes(x) && !props.filteredOutGames.includes(x)}
              disabled={!props.gamesRemovable && !props.disallowedGames.includes(x)}
              data-player-range={`${x['min_players']},${x['max_players']}`}
              data-valid-player-count={x['min_players'] <= props.numberOfPlayers && x['max_players'] >= props.numberOfPlayers}
              // data-available={`${props.availableGames.includes(x)}`}
              style={{
                backgroundImage: `url(https://hooleymcknight.com/jackbox-wheel/jackbox-tiles/${x.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'lighten',
                backgroundColor: 'var(--dark-purple)'
              }}
            >
              <div className="tile-overlay"></div>
              <div className="tile-innards">
                <span className="game-title">{x.title}</span>
                <button className="toggleGameBtn" onClick={e => toggleGameAllowance(e)}>
                  {!props.disallowedGames.includes(x) && !props.filteredOutGames.includes(x) ? 'REMOVE' : 'ADD'}
                </button>
                <p className="game-desc" role="button" onClick={e => expandDesc(e)}>
                  <span>Description:</span>
                  {x.description}
                </p>
                <span className="disabled-tooltip">You cannot have less than 8 games in the wheel.</span>
              </div>
            </div>
          )}
          </div>
        </div>
      )}
    </>
  )
}

export default GamesList