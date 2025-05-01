// imports

const TTGGamesList = (props) => {
  const gamesData = props.gamesData; // all games
  const types = [...new Set(gamesData.map(x => x.type))];
  let numberOfPlayers = props.numberOfPlayers;

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

  const evaluateTimeEstimate = (timeEstimateString) => {
    let timeEstimate = timeEstimateString.includes('eval') ? eval(timeEstimateString.split(': ')[1]) : timeEstimateString
    if (!String(timeEstimate).includes('-') && Number(timeEstimate) % 60 == 0) {
        return `${timeEstimate / 60} hr`;
    }
    return `${timeEstimate} min`;
  }

  return (
    <>
      {types.map(type =>
        <div className={props.typeClassName} data-description-shown={false} key={type}>
          <h2>{type.charAt(0).toUpperCase() + type.slice(1, type.length)}</h2>
          <div className={props.className}>
          {gamesData.filter(data => data.type == type).map(x =>
            <div
              className="button-tile"
              data-type={type}
              key={x.title}
              data-game={x.title}
              data-active={!props.disallowedGames.includes(x) && !props.filteredOutGames.includes(x)}
              disabled={!props.gamesRemovable && !props.disallowedGames.includes(x)}
              data-player-range={`${x['min_players']},${x['max_players']}`}
              data-valid-player-count={x['min_players'] <= numberOfPlayers && x['max_players'] >= numberOfPlayers}
              // data-available={`${props.availableGames.includes(x)}`}
              style={{
                backgroundImage: `url(https://hooleymcknight.com/tabletop-games/tiles/${x.image})`,
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
                <span className="time-estimate">{evaluateTimeEstimate(x.time_estimate)}</span>
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
  );
}

export default TTGGamesList;