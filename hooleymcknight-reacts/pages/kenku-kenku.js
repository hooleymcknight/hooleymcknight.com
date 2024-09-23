import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/KenkuKenku.module.scss';
import wordsData from './api/words.json';

// const apiEndpoint = '/api/updateWords.js'; // this needs .js after uploading

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://hooleymcknight.com/api/updateWords.js`)
  const repo = await res.json()
  // Pass data to the page via props
  return { props: { wordsProps } }
}

const KenkuKenku = ({ wordsProps }) => {
  const [words, setWords] = useState(wordsData);

  useEffect(() => {
  }, [words]);

  const sortAlphabetically = () => {
    const sorted = Object.keys(words).sort().reduce((obj, key) => {
      obj[key] = words[key];
      return obj;
    }, {});
    setWords(sorted);
  }

  const unSort = () => {
    setWords(wordsData);
  }

  const readWords = async () => {
    const response = await fetch(`${document.location.origin}/api/updateWords${document.location.origin.includes('hooleymcknight.com') ? '.js' : ''}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  const addWord = async (e) => {
    const aws = document.querySelector('.add-word-section');
    const newWord = aws.querySelector('input[name="word"]').value;

    if (!newWord.length) {
      window.alert('must enter a word');
      return;
    }

    const newTags = aws.querySelector('input[name="tags"]').value.split(',');
    const newPhrase = aws.querySelector('input[name="phrase"]').value;

    wordsData[newWord] = {
      "tags": newTags,
      "related_words": [],
      "phrases": [newPhrase]
    }
    const response = await fetch(`${document.location.origin}/api/updateWords${document.location.origin.includes('hooleymcknight.com') ? '.js' : ''}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: wordsData,
        type: 'add',
      })
    });
    if (response.status === 200) {
      console.log('re-render')
      console.log(response.pantaloons)
      setWords(wordsData); // ========= this is not re-rendering
    }
  }

  return (
    <Layout page='kenku-kenku' className={styles['kenku-kenku']}>
      <Head>
        <title>{`${siteTitle} || Kenku Kenku`}</title>
        <meta name="description" content="Kenku kenku kenku kenku kenku!" />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Kenku kenku kenku kenku kenku!" />
      </Head>

      <h1>Kenku Kenku's Library</h1>

      <div className="search"></div>
      <div className="sort">
        <button onClick={sortAlphabetically}>Sort Alphabetically</button>
        <button onClick={unSort}>Unsort</button>
      </div>

      <button onClick={readWords}>read words</button>

      <div className="add-word-section">
        <input type="text" placeholder="word" name="word"></input>
        <input type="text" placeholder="tags, more tags" name="tags"></input>
        <input type="text" placeholder="original phrase" name="phrase"></input>
        <button onClick={addWord}>Add</button>
      </div>

      <div className={styles['word-bank']}>
        {Object.keys(words).map((x) => 
          <p key={x}>{x}</p>
        )}
      </div>

    </Layout>
  );
}

export default KenkuKenku;