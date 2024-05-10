const [availableGames, setAvailableGames] = useState([...gamesData]);
  const [activeGames, setActiveGames] = useState([...gamesData]);
  const [manuallyDisallowedGames, setManuallyDisallowedGames] = useState([]);

  const [allowedGames, setAllowedGames] = useState([...gamesData]);
  const [gamesRemovable, setGamesRemovable] = useState(true);
  const [excludedFilters, setExcludedFilters] = useState([]);

// ================

  const changeActiveGames = (type, data, dataToggle) => {
    // this exists because we need another state for games that are allowed based on number of players
    // it cant change activegames or it will remove the users choices.
    // allowed vs active

    let disallowedGames = [];
    let newAllowedGames = [];

    if (type === 'playerCount') { // update the available games based on number of players
      gamesData.forEach((game) => {
        if (game.min_players <= data && game.max_players >= data) { // we must also check that the game in question hasn't already been disallowed
          newAllowedGames.push(game);
        }
      });
      setAvailableGames(gamesData.filter(x => newAllowedGames.includes(x)));
    }
    else if (!dataToggle) { // remove games
      disallowedGames = gamesData.filter(x => !availableGames.includes(x));
      gamesData.forEach((game) => {
        if (String(game[type]).includes(data) && !dataToggle || !String(game[type]).includes(data) && dataToggle) {
          disallowedGames.push(game);
        }
      });
      if (!excludedFilters.includes(data)) {
        setExcludedFilters([...excludedFilters, data]);
      }
      setAvailableGames(availableGames.filter(x => !disallowedGames.includes(x)));
    }
    else { // add games back in
      let gamesToReAdd = [];
      let missingGames = gamesData.filter(x => !availableGames.includes(x));
      const newExcFilters = [...excludedFilters].filter(x => x !== data);
      
      missingGames.forEach((game) => {
        if (String(game[type]).includes(data) && dataToggle) {
          if (!newExcFilters.includes(game.playStyle) || !newExcFilters.includes(game.category.split(' ')[0]) || !newExcFilters.includes(game.category.split(' ')[1])) {
            gamesToReAdd.push(game);
          }
        }
      });
      setExcludedFilters(newExcFilters);
      setAvailableGames([...availableGames, ...gamesToReAdd]);
    }

    
  }

  const changeAllowedGames = (e) => {
    const selectedGame = e.target.closest('button').getAttribute('data-game');
    const gameIndex = activeGames.map(x => x.title).indexOf(selectedGame);
    // if the game is in the active games, remove it
    if (gameIndex > -1) {
      const newActive = [...activeGames];
      newActive.splice(gameIndex, 1);
      if (newActive.length <= 8) setGamesRemovable(false);
      setActiveGames([...newActive]);
    }
    else { // otherwise, add the game back in
      const gameInfo = gamesData.filter(x => x.title === selectedGame)[0];
      const newIndex = gamesData.indexOf(gameInfo);
      const newActive = [...activeGames];
      newActive.splice(newIndex, 0, gameInfo);
      if (newActive.length > 8) setGamesRemovable(true);
      setActiveGames([...newActive]);
    }
  }