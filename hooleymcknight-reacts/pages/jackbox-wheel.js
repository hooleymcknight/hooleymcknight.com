import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

import styles from '../styles/Wheel.module.scss';
import Wheel from '../components/wheel/wheel';
import GamesList from '../components/wheel/gamesList';
import WheelTitle from '../components/wheel/wheelTitle';
import GamesListDesc from '../components/wheel/gamesListDesc';

import gamesDataRaw from '../components/wheel/games_data.json';
import Filters from '../components/wheel/filters';
import BackToWheel from '../components/wheel/backToWheel';
import WinnerGame from '../components/wheel/winnerGame';

const defaultPlayerCount = 4;
const maxWheelSlices = 8;

export default function WheelPage() {
  const gamesData = gamesDataRaw.games;

  const [activeGames, setActiveGames] = useState(gamesData);
  const [disallowedGames, setDisallowedGames] = useState([]); // these are the games that are MANUALLY toggled. unaffected by filters.
  const [filteredOutGames, setFilteredOutGames] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(defaultPlayerCount);
  const [offAttributes, setOffAttributes] = useState({"pack": [], "category": [], "playStyle": []});
  const [winningGame, setWinningGame] = useState('');

  const [showWheelButton, setShowWheelButton] = useState(false);
  const [confettiAllowed, setConfettiAllowed] = useState(true);

  const finalGameSet = activeGames.filter(x => !filteredOutGames.includes(x)).filter(x => !disallowedGames.includes(x));

  let categories = [... new Set(gamesData.map(x => x.category))];
  categories.forEach((category, index) => {
    if (category.includes(' ')) {
      categories.splice(index, 1);
      categories.push(category.split(' ')[0], category.split(' ')[1]);
    }
  });
  categories = [... new Set(categories)];

  let playStyles = [... new Set(gamesData.map(x => x.playStyle))];
  let partyPacks = [... new Set(gamesData.map(x => x.pack))];

  const applyChange = (type, data, dataToggle) => {
    if (type === 'game') { // dataToggle for this is probably reverse of what I would want it. boolean to text is dumb.
      const thisGame = gamesData.filter(x => x.title === data)[0];
      if(dataToggle == 'true' && !disallowedGames.includes(thisGame)) { // user wants this game disallowed
        let newDisallowedGames = [... new Set(disallowedGames), thisGame];
        setDisallowedGames(newDisallowedGames);
      }
      else if (dataToggle == 'false' && (disallowedGames.includes(thisGame) || filteredOutGames.includes(thisGame))) { // user wants to put this game back in the mix
        const indexOfGameToAllow = disallowedGames.indexOf(thisGame);
        let newDisallowedGames = [... new Set(disallowedGames)];
        newDisallowedGames.splice(indexOfGameToAllow, 1);
        setDisallowedGames(newDisallowedGames);

        const indexOfGameToUnfilter = filteredOutGames.indexOf(thisGame);
        let newFilteredOutGames = [... new Set(filteredOutGames)];
        newFilteredOutGames.splice(indexOfGameToUnfilter, 1);
        setFilteredOutGames(newFilteredOutGames);
      }
    }
    else if(type === 'playerCount') {
      setNumberOfPlayers(data);
      let validGames = gamesData.filter(x => x['min_players'] <= data && x['max_players'] >= data);
      setActiveGames(gamesData.filter(x => !disallowedGames.includes(x)).filter(x => validGames.includes(x)));
    }
    else {
      // update a reference what we are filtering in or out
      // {"pack": [], "category": [], "playStyle": []}
      let newOffAttributes = offAttributes;

      // if the attribute is currently filtered out
      if (newOffAttributes[type].filter(x => x.includes(data)).length && dataToggle) {
        newOffAttributes[type] = newOffAttributes[type].filter(x => !x.includes(data));
        setOffAttributes(newOffAttributes);
      }
      else if (!newOffAttributes[type].filter(x => x.includes(data)).length && !dataToggle) {
        newOffAttributes[type].push(data);
        setOffAttributes(newOffAttributes);
      }


      let relevantFilteredGames;
      if (type === 'pack') {
        relevantFilteredGames = gamesData.filter(x => x[type] == data);
      }
      else {
        relevantFilteredGames = gamesData.filter(x => x[type].includes(data));
      }

      if (!dataToggle) {
        // filter out relevant games (add to from filteredOutGames)
        let newFilteredOutGames = [... new Set(filteredOutGames), ...relevantFilteredGames];
        setFilteredOutGames(newFilteredOutGames);
      }
      else {
        // add relevant games back into the mix (remove from filteredOutGames)
        // first we need to find out whatever is filtered OFF
        const filterOptions = Object.keys(offAttributes);
        const filterValues = Object.values(offAttributes).filter(x => x.length > 0);

        relevantFilteredGames.forEach((game) => {
          filterOptions.forEach((option) => {
            // for categories only
            if (option === 'category') {
              game['category'].split(' ')?.forEach((category) => {
                if (offAttributes['category'].includes(category)) {
                  relevantFilteredGames.splice(relevantFilteredGames.indexOf(game), 1);
                }
              });
            }
            else if (offAttributes[option].length) {
              if (offAttributes[option].includes(game[option])) {
                relevantFilteredGames.splice(relevantFilteredGames.indexOf(game), 1);
              }
            }
          });
        });

        setFilteredOutGames(filteredOutGames.filter(x => !relevantFilteredGames.includes(x)));
      }
    }
  }

  const toggleWheelButton = () => {
    const firstPack = document.querySelector('[data-description-shown]');
    if (!firstPack) return;
    if (!showWheelButton && window.scrollY + window.innerHeight >= firstPack.offsetTop) {
      setShowWheelButton(true);
    }
    else if (showWheelButton && window.scrollY + window.innerHeight < firstPack.offsetTop) {
      setShowWheelButton(false);
    }
  }

  function updateConfettiAllowed(value) {
    window.sessionStorage.setItem('confetti-allowed', value);
    setConfettiAllowed(value);
  }

  useEffect(() => {
    if (window.sessionStorage.getItem('confetti-allowed') === null) {
      window.sessionStorage.setItem('confetti-allowed', 'true');
    }
    else if(window.sessionStorage.getItem('confetti-allowed') == 'false') {
      setConfettiAllowed(false);
    }

    window.addEventListener('scroll', toggleWheelButton);
  }, [showWheelButton]);

  return (
    <Layout page='jackbox-wheel'>
      <Head>
        <title>{`${siteTitle} || Jackbox Wheel`}</title>
        <meta name="description" content="The esteemed Jackbox Wheel... Happy spinning!" />
        <meta property="og:image" content={`https://hooleymcknight.com/jackbox-wheel/jackbox-wheel.png`} />
        <meta name="og:title" content="The esteemed Jackbox Wheel... Happy spinning!" />
      </Head>

      <WheelTitle className={styles['wheel-title']} />
      <WinnerGame className={styles['winner-title']} winningGame={winningGame} confettiAllowed={confettiAllowed} />
      <Wheel styles={styles} activeGames={finalGameSet} setWinningGame={(e) => setWinningGame(e)} /> {/* make sure active games excludes disallowed games */}

      <Filters className={styles['filters']}
        toggleClassName={styles['filter-toggle']}
        partyPacks={partyPacks}
        categories={categories}
        playStyles={playStyles}
        onApply={(type, data, dataToggle) => applyChange(type, data, dataToggle)}
        defaultPlayerCount={defaultPlayerCount}
        confettiAllowed={confettiAllowed}
        onToggleConfetti={(value) => updateConfettiAllowed(value)}
      />

      <GamesListDesc className={styles['games-list-desc']} />
      <GamesList className={styles['games-list']}
        packClassName={styles['pack-group']}
        gamesData={gamesData}
        disallowedGames={disallowedGames}
        numberOfPlayers={numberOfPlayers}
        filteredOutGames={filteredOutGames}
        gamesRemovable={finalGameSet.length > maxWheelSlices}
        onApply={(type, data, dataToggle) => applyChange(type, data, dataToggle)}
      />

      {showWheelButton ?
        <BackToWheel className={styles['back-to-wheel']} />
        : ''
      }

    </Layout>
  );
}
