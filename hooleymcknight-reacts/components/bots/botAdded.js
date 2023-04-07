import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../../styles/BotAdded.module.scss'
import botData from './bots.json'

const BotAdded = () => {
  const router = useRouter()
  const [bot, setBot] = useState({})
  
  useEffect(() => {
    setBot(botData[router.query.bot])
  }, [router.query])

  return (
    <div className={styles["bot-added-section"]}>
      { bot ?
        <>
          <h1>Congratulations! You've added one of my bots to your server.</h1>

          <div className={styles["bot-details"]}>
            <h2 className="bot-name">{bot.name}</h2>
            <img src={`https://hooleymcknight.com/images/bots/${bot.image}`} alt={bot.name} />

            <h4 className="desc-header">Description:</h4>
            <p className="bot-description">{bot.description}</p>

            <h4 className="cl-header">Command List:</h4>
            <p className="command-list">{bot['command_list']}</p>
          </div>
        </>
        :
        <>
          <h1>Something has gone wrong, at least on this page.</h1>
          <p>Double check that the bot has been added to your server.</p>
        </>
      }
    </div>
  )
}

export default BotAdded