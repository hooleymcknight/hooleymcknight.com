import { useState } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

import styles from '../styles/Wheel.module.scss'
import Wheel from '../components/wheel/wheel'
import GamesList from '../components/wheel/gamesList'
import WheelTitle from '../components/wheel/wheelTitle'
import GamesListDesc from '../components/wheel/gamesListDesc'

import gamesDataRaw from '../components/wheel/games_data.json'

export default function WheelPage() {
  const gamesData = gamesDataRaw.games
  const [activeGames, setActiveGames] = useState([...gamesData])
  const [gamesRemovable, setGamesRemovable] = useState(true)

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
      <Wheel styles={styles} activeGames={activeGames} />

      <GamesListDesc className={styles['games-list-desc']} />
      <GamesList className={styles['games-list']} gamesRemovable={gamesRemovable} gamesData={gamesData} activeGames={activeGames} onChange={e => changeActiveGames(e)} />

    </Layout>
  )
}
