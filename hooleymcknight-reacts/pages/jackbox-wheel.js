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
const minWheelSlices = 6;

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
  const [sliderData, setSliderData] = useState(defaultPlayerCount);

  const finalGameSet = activeGames.filter(x => !filteredOutGames.includes(x)).filter(x => !disallowedGames.includes(x));

  let originalCategories = [... new Set(gamesData.map(x => x.category))];
  let categories = [];
  originalCategories.forEach((category, index) => {
    if (category.includes(' ')) {
      originalCategories.splice(index, 1);
      categories.push(category.split(' ')[0], category.split(' ')[1]);
    }
    else {
      categories.push(category);
    }
  });
  categories = [... new Set(categories)];

  let playStyles = [... new Set(gamesData.map(x => x.playStyle))];
  let partyPacks = [... new Set(gamesData.map(x => x.pack))];

  const applyChange = (type, data, dataToggle, target) => {
    if (type === 'game') { // dataToggle for this is probably reverse of what I would want it. boolean to text is dumb.
      const thisGame = gamesData.filter(x => x.title === data)[0];
      if(dataToggle == 'true' && !disallowedGames.includes(thisGame)) { // user wants this game disallowed
        let newDisallowedGames = [... new Set(disallowedGames), thisGame];
        if (activeGames.filter(x => !filteredOutGames.includes(x)).filter(x => !newDisallowedGames.includes(x)).length <= minWheelSlices) {
          window.alert(`No less than ${minWheelSlices} games please. That\'s my favorite number.`);
        }
        else {
          setDisallowedGames(newDisallowedGames);
        }
      }
      else if (dataToggle == 'false' && (disallowedGames.includes(thisGame) || filteredOutGames.includes(thisGame))) { // user wants to put this game back in the mix
        const indexOfGameToAllow = disallowedGames.indexOf(thisGame);
        let newDisallowedGames = [... new Set(disallowedGames)];
        newDisallowedGames.splice(indexOfGameToAllow, 1);

        const indexOfGameToUnfilter = filteredOutGames.indexOf(thisGame);
        let newFilteredOutGames = [... new Set(filteredOutGames)];
        newFilteredOutGames.splice(indexOfGameToUnfilter, 1);

        if (activeGames.filter(x => !newFilteredOutGames.includes(x)).filter(x => !newDisallowedGames.includes(x)).length <= minWheelSlices) {
          window.alert(`No less than ${minWheelSlices} games please. That\'s my favorite number.`);
        }
        else {
          setDisallowedGames(newDisallowedGames);
          setFilteredOutGames(newFilteredOutGames);
        }
      }
    }
    else if(type === 'playerCount') {
      let validGames = gamesData.filter(x => x['min_players'] <= data && x['max_players'] >= data);
      let newActiveGames = gamesData.filter(x => !disallowedGames.includes(x)).filter(x => validGames.includes(x));
      let shownGames = newActiveGames.filter(x => !filteredOutGames.includes(x)).filter(x => !disallowedGames.includes(x))
      if (shownGames.length <= minWheelSlices && validGames.length > 0) {
        window.alert('Ack!! Wheel cannot go so smol!');
        document.querySelector('input[name="player-count"]').value = numberOfPlayers;
        setSliderData(numberOfPlayers);
      }
      else if(data) {
        setSliderData(data);
        setNumberOfPlayers(data);
        setActiveGames(newActiveGames);
      }
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
        let shownGames = finalGameSet.filter(x => !newFilteredOutGames.includes(x));
        if (shownGames.length <= minWheelSlices) {
          window.alert('You\'re gonna make the wheel too small. It can\'t spin like that.');
          target.checked = true;
        }
        else {
          setFilteredOutGames(newFilteredOutGames);
        }
      }
      else {
        // add relevant games back into the mix (remove from filteredOutGames)
        // first we need to find out whatever is filtered OFF
        const filterOptions = Object.keys(offAttributes);

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

  const resetFilters = () => {
    setFilteredOutGames([]);
    setDisallowedGames([]);
    setOffAttributes({"pack": [], "category": [], "playStyle": []});
    setActiveGames(gamesData);
    document.querySelector('input[name="player-count"]').value = defaultPlayerCount;
    setNumberOfPlayers(defaultPlayerCount);
    setSliderData(defaultPlayerCount);
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
        onApply={(type, data, dataToggle, target) => applyChange(type, data, dataToggle, target)}
        defaultPlayerCount={defaultPlayerCount}
        confettiAllowed={confettiAllowed}
        onToggleConfetti={(value) => updateConfettiAllowed(value)}
        sliderData={sliderData}
        setSliderData={setSliderData}
        resetFilters={resetFilters}
      />

      <GamesListDesc className={styles['games-list-desc']} />
      <GamesList className={styles['games-list']}
        packClassName={styles['pack-group']}
        gamesData={gamesData}
        disallowedGames={disallowedGames}
        numberOfPlayers={numberOfPlayers}
        filteredOutGames={filteredOutGames}
        gamesRemovable={finalGameSet.length > minWheelSlices}
        onApply={(type, data, dataToggle) => applyChange(type, data, dataToggle)}
      />

      {showWheelButton ?
        <BackToWheel className={styles['back-to-wheel']} />
        : ''
      }

    </Layout>
  );
}
