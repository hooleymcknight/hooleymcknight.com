import Head from 'next/head';
import Layout from '../components/layout';
import styles from '../styles/CodingHour.module.scss';
import { useEffect, useState } from 'react';

const characters = ['arthur', 'augustus', 'blythe', 'elijah', 'harley', 'hester', 'james', 'kathryn', 'langston', 'luisa', 'margaret', 'mattias', 'olive', 'penelope', 'riley', 'theodore', 'wren'];

function pickRandom(set) {
  const selectedIndex = Math.floor(Math.random() * (set.length));
  return set[selectedIndex];
}

export default function CodingHour() {
  const [activeImg, setActiveImg] = useState(pickRandom(characters));
  const [sliderData, setSliderData] = useState('43');
  // const [formData, setFormData] = useState({
  //   name: '',
  //   pronouns: '',
  //   food: ''
  // });

  function randomizeImage() {
    setActiveImg(pickRandom(characters));
  }

  function toggleSelection(e) {
    // setFormData({});
    console.log('I didnt have time to set this up yet lol');
  }

  function updateSlider(e) {
    const value = e.target.value;
    setSliderData(value);
  }

  return (
    <Layout page='coding-hour' className={styles.codingHourPage}>
      <Head>
        <title>May 5th Charity Stream - Coding Hour Reference</title>
      </Head>

      <div className={styles.codingHour}>
        <p>hehe</p>

        <div className="welcome-modal">
          <h1>Welcome to {`{{GAME}}`}</h1>

          <form>

            <div className="formset">
              <label>Character Name</label>
              <input type="text" name="character-name" />
            </div>

            <div className="formset">
              <label>Pronouns</label>
              
              <div>
                <input type="radio" name="pronouns" value="she/her" />
                <label for="she/her" onClick={(e) => {toggleSelection(e)}}>she/her</label>
              </div>

              <div>
                <input type="radio" name="pronouns" value="he/him" />
                <label for="he/him" onClick={(e) => {toggleSelection(e)}}>he/him</label>
              </div>

              <div>
                <input type="radio" name="pronouns" value="they/them" />
                <label for="they/them" onClick={(e) => {toggleSelection(e)}}>they/them</label>
              </div>

              <div>
                <input type="radio" name="pronouns" value="name only" />
                <label for="name only" onClick={(e) => {toggleSelection(e)}}>name only</label>
              </div>
            </div>

            <div className="formset" id="character-age-set">
              <label>Character Age</label>
              <input type="range" name="character-age" min="20" max="65" onChange={(e) => {updateSlider(e)}} />
              <span>{sliderData}</span>
            </div>

            <div className="formset">
              <label>Favorite Food</label>
              <input type="text" name="favorite-food" />
            </div>

          </form>

          <div className="character-image-section">
            <img src={`https://hooleymcknight.com/images/fs/${activeImg}.jpg`} alt="character image" />
            <button type="button" onClick={randomizeImage}>Randomize</button>
          </div>

        </div>
      </div>

      <div className={styles.explanation}>
        <h1>Explanation of the Coding Hour:</h1>
        <p>The goal of this challenge is to create a welcome screen for a game using C# and Unity. The above is an example/mockup if you want it, but of course feel free to deviate.</p>
        <p>Notable parts of the above mockup:</p>
        <ul>
          <li>character name text input</li>
          <li>pronoun radio button selection</li>
          <li>character age slider</li>
          <li>favorite food text input</li>
          <li>image randomizer button</li>
        </ul>
        <p>This component isn't generating images, it's just randomly picking from a group of pictures. If you want to use the ones we have, you can <a download href="https://hooleymcknight.com/images/fs/images.zip">download them here.</a> Just please don't use the pictures outside of this code challenge. We made them for a murder mystery game we'd like to share someday :) Thank you!</p>
        <p>Other goals I think would be great to set for this challenge:</p>
        <ul>
          <li>Add a submit button that presents the submitted info back to the user</li>
          <li>Hide a rickroll somehow, somewhere in your code or your game</li>
          <li>Make the pronoun labels clickable too, instead of just the radio buttons</li>
          <li>Any other fun additions you want</li>
          <li>No stress beyond just the standard that's included with coding, lol</li>
        </ul>
        <p>I do also want to note just for clarification-sake that I didn't spend a ton of time building this reference page. It's just a reference page. If it looks funny and you're on mobile, I recommend pulling this up on desktop. I promise that normally I code stuff better for mobile.</p>
        <p>Thanks so much for being interested in the code challenge and participating if you do! If we have a great time, we'll keep doing this more in the future. Woo!</p>
        <a href="https://hooleymcknight.com/blog/may-5-charity-stream/" alt="May 5 charity stream blog page">Click here to go back to the charity stream blog page, if you wish.</a>
        
      </div>

    </Layout>
  );
}
