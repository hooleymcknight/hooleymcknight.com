import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/projects/MedTool.module.scss';
import domtoimage from 'dom-to-image';

const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function MedTool() {
  const [hoursGap, setHoursGap] = useState(8);
  const [startingTime, setStartingTime] = useState(0);
  const [startingDate, setStartingDate] = useState();
  const [title, setTitle] = useState();

  const [repeatableDays, setRepeatableDays] = useState(1);
  const [allHoursToMedicate, setAllHoursToMedicate] = useState({});

  const startingDateHandler = (value) => {
    let date = new Date(value.replace(/-/g, '/')).toLocaleDateString('en-US', {
      month: "numeric", day: "numeric"
    });
    setStartingDate(date);
  }

  const exportToImage = () => {
    const output = document.getElementById('output-section');
    domtoimage.toPng(output)
      .then(function (dataUrl) {
        // remove lingering things from the last time
        Array.from(document.body.childNodes).filter(x => x.nodeName === 'IMG').forEach((node) => {
          node.remove();
        })
        if (document.getElementById('download-automatically')) {
          document.getElementById('download-automatically').remove();
        }

        // add new image and download button
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);

        const imageTitle = title ? title : 'med-feeding-times-table';

        const a = document.createElement('a');
        a.id = 'download-automatically';
        a.setAttribute('href', dataUrl);
        a.setAttribute('download', imageTitle);
        document.body.appendChild(a);
      })
      .then(function() {
        document.getElementById('download-automatically').click();
      })
      .catch(function (error) {
        return error;
      });
  }

  useEffect(() => {
    for (let i=1; i<12; i++) {
      if ((24 * i) % hoursGap === 0) {

        let hoursToMedicate = [];
        for (let n=Number(startingTime); n<(24*i); n++) {
          if (Number(n - startingTime) % hoursGap === 0) {
            hoursToMedicate.push(n);
          }
        }
      
        let newHours = { '1': [] };
        hoursToMedicate.forEach((hour) => {
          if(hour < 24) {
            newHours['1'].push(hour);
          }
          else {
            let newHour = hour;
            let day = 1;
            while (newHour >= 24) {
              newHour = newHour - 24;
              day++;
              if(!newHours[`${day}`]) {
                newHours[`${day}`] = [];
              }
            }
            newHours[`${day}`].push(newHour);
          }
        })
        
        setRepeatableDays(i);
        setAllHoursToMedicate(newHours);
        break;
      }
    }
  }, [hoursGap, startingTime]);

  return (
    <Layout page='med-tool'>
      <Head>
        <title>{`${siteTitle} || Medication Tool`}</title>
        <meta name="description" content="Help figure out when is a good time to give your pet their meds." />
        <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
        <meta name="og:title" content="Help figure out when is a good time to give your pet their meds." />
      </Head>

      <main className={styles['medtool']}>
        <div className="med-tool-selectors">
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
          <div className="med-selector">
            <label htmlFor="starting-date">Starting Date:</label>
            <input type="date" name="starting-date" onChange={(e) => {startingDateHandler(e.target.value)}}></input>
          </div>
          <div className="med-selector">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" onChange={(e) => {setTitle(e.target.value)}}></input>
          </div>
        </div>

        <button onClick={exportToImage}>Export</button>

        <div id="output-section">
          {title ? <h2>{title}</h2> : ''}

          <div className="output-times" style={{marginTop: '40px'}}>

            {[...days].slice(0, repeatableDays).map((i) => 
              <div key={i} className="day-section">
                {startingDate ?
                  <h3>Day {i} - {`${new Date(new Date(startingDate).setDate(new Date(startingDate).getDate() + (i - 1))).toLocaleDateString('en-US', {month: "numeric", day: "numeric"})}`}</h3>
                :
                  <h3>Day {i}</h3>
                }
                {times.map(x =>
                  <div key={x} className="time-slot" data-x={x}
                    data-active={allHoursToMedicate[`${i}`] ? allHoursToMedicate[`${i}`].includes(x) : "false"}>
                      {`${x}:00`}
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>

        <div className="download-section">
          <a href="" download></a>
        </div>

      </main>

    </Layout>
  );
}
