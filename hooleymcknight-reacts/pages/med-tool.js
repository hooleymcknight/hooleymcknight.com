import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/MedTool.module.scss';

const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export default function MedTool() {
  const [hoursGap, setHoursGap] = useState(8);
  const [startingTime, setStartingTime] = useState(0);

  return (
    <Layout page='med-tool'>
      <Head>
        <title>{`${siteTitle} || Medication Tool`}</title>
        <meta name="description" content="Help figure out when is a good time to give your pet their meds." />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Help figure out when is a good time to give your pet their meds." />
      </Head>

      <main className={styles['medtool']}>
        <div className="med-selector">
          <label htmlFor="hours-gap">Hours Between Doses:</label>
          <div>
            <input type="range" name="hours-gap" min="3" max="12" onChange={(e) => {setHoursGap(e.target.value)}} defaultValue={hoursGap} />
            <span>{hoursGap}</span>
          </div>
        </div>
        <div className="med-selector">
          <label htmlFor="starting-time">Starting Time:</label>
          <div>
            <select name="starting-time" defaultValue={startingTime} onChange={(e) => {setStartingTime(e.target.value)}}>
              {times.map(x =>
                <option key={x} value={x}>{`${x}:00`}</option>
              )}
            </select>
          </div>
        </div>
        
        <div className="output-times" style={{marginTop: '40px'}}>
          {times.map(x =>
            <div key={x} className="time-slot" data-x={x} data-active={times[x - startingTime >= 0 ? x - startingTime : 24 + x - startingTime] % hoursGap == 0}>{`${x}:00`}</div>
          )}
        </div>

      </main>

    </Layout>
  );
}
