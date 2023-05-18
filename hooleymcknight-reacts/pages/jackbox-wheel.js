import { useState } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

import styles from '../styles/Wheel.module.scss'
import Wheel from '../components/wheel/wheel'
import GamesList from '../components/wheel/gamesList'
import WheelTitle from '../components/wheel/wheelTitle'
import GamesListDesc from '../components/wheel/gamesListDesc'

import gamesDataRaw from '../components/wheel/games_data.json'
import Filters from '../components/wheel/filters'

export default function WheelPage() {
  const gamesData = gamesDataRaw.games
  const [availableGames, setAvailableGames] = useState([...gamesData])
  const [activeGames, setActiveGames] = useState([...gamesData])
  const [gamesRemovable, setGamesRemovable] = useState(true)
  const [excludedFilters, setExcludedFilters] = useState([])

  let categories = [... new Set(gamesData.map(x => x.category))]
  categories.forEach((category, index) => {
    if (category.includes(' ')) {
      categories.splice(index, 1)
      categories.push(category.split(' ')[0], category.split(' ')[1])
    }
  })
  categories = [... new Set(categories)]

  let playStyles = [... new Set(gamesData.map(x => x.playStyle))]

  const changeAllowedGames = (type, data, dataToggle) => {
    // we need another state for games that are allowed based on number of players
    // it cant change activegames or it will remove the users choices.

    let outOfRangeGames = []

    if (type === 'playerCount') { // update the available games based on number of players
      gamesData.forEach((game) => {
        if (game.min_players > data) {
          outOfRangeGames.push(game)
        }
        if (game.max_players < data) {
          outOfRangeGames.push(game)
        }
      })
      setAvailableGames(gamesData.filter(x => !outOfRangeGames.includes(x)))
    }
    else if (!dataToggle) { // remove games
      outOfRangeGames = gamesData.filter(x => !availableGames.includes(x))
      gamesData.forEach((game) => {
        if (game[type].includes(data) && !dataToggle || !game[type].includes(data) && dataToggle) {
          outOfRangeGames.push(game)
        }
      })
      if (!excludedFilters.includes(data)) {
        setExcludedFilters([...excludedFilters, data])
      }
      setAvailableGames(availableGames.filter(x => !outOfRangeGames.includes(x)))
    }
    else { // add games back in
      let gamesToReAdd = []
      let missingGames = gamesData.filter(x => !availableGames.includes(x))
      const newExcFilters = [...excludedFilters].filter(x => x !== data)
      
      missingGames.forEach((game) => {
        if (game[type].includes(data) && dataToggle) {
          if (!newExcFilters.includes(game.playStyle) || !newExcFilters.includes(game.category.split(' ')[0]) || !newExcFilters.includes(game.category.split(' ')[1])) {
            gamesToReAdd.push(game)
          }
        }
      })
      setExcludedFilters(newExcFilters)
      setAvailableGames([...availableGames, ...gamesToReAdd])
    }

    
  }

  const changeActiveGames = (e) => {
    const selectedGame = e.target.closest('button').getAttribute('data-game')
    const gameIndex = activeGames.map(x => x.title).indexOf(selectedGame)
    // if the game is in the active games, remove it
    if (gameIndex > -1) {
      const newActive = [...activeGames]
      newActive.splice(gameIndex, 1)
      if (newActive.length <= 8) setGamesRemovable(false)
      setActiveGames([...newActive])
    }
    else { // otherwise, add the game back in
      const gameInfo = gamesData.filter(x => x.title === selectedGame)[0]
      const newIndex = gamesData.indexOf(gameInfo)
      const newActive = [...activeGames]
      newActive.splice(newIndex, 0, gameInfo)
      if (newActive.length > 8) setGamesRemovable(true)
      setActiveGames([...newActive])
    }
  }

  return (
    <Layout page='jackbox-wheel'>
      <Head>
        <title>{siteTitle} || Jackbox Wheel</title>
      </Head>

      <WheelTitle className={styles['wheel-title']} />
      <Wheel styles={styles} activeGames={activeGames.filter(x => availableGames.includes(x))} />

      <Filters className={styles['filters']} categories={categories} playStyles={playStyles} onApply={(type, data, dataToggle) => changeAllowedGames(type, data, dataToggle)} />

      <GamesListDesc className={styles['games-list-desc']} />
      <GamesList className={styles['games-list']}
      gamesRemovable={gamesRemovable}
      gamesData={gamesData}
      activeGames={activeGames}
      availableGames={availableGames}
      onChange={e => changeActiveGames(e)} />

    </Layout>
  )
}
