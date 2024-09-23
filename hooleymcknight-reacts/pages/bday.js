import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Bday.module.scss';
import Layout, { siteTitle } from '../components/layout';
import fs from 'fs';

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://hooleymcknight.com/api/bday.js`)
    const repo = await res.json()
    // Pass data to the page via props
    return { props: { repo } }
}

export default function Bday({ repo }) {
    const [giftData, setGiftData] = useState([]);

    // async function getData(query, callback) {
    //     const response = await fetch(`${document.location.origin}/api/getData${document.location.origin.includes('hooleymcknight.com') ? '.js' : ''}`, {
    //         method: 'POST',
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ query: query })
    //     });
    //     console.log(response);
    //     const res = await response.json();
    //     console.log(res);
    //     if (callback) {
    //         callback(res);
    //     }
    // }

    const showSpoiler = (e) => {
        const classes = e.target.classList;
        if (classes.contains('shown')) {
            classes.remove('shown');
        }
        else {
            classes.add('shown');
        }
    }

    const tryAdd = async () => {
        const data = [
            {
                "giftname": "Perixx Keyboard",
                "img": "https://m.media-amazon.com/images/I/61jpoesvqAL._AC_SX679_.jpg",
                "link": "https://a.co/d/g2Zjn9g",
                "bought": "1"
            },
            {
                "giftname": "Mouse",
                "img": "https://m.media-amazon.com/images/I/718b9wK3eaL._AC_SX679_.jpg",
                "link": "https://a.co/d/bwgblLi",
                "bought": "0"
            }
        ]
    }

    useEffect(() => {
        // console.log('use effect')
        if (!giftData || !giftData.length) {
            console.log('there is no gift data yet')
            // getData(`SELECT giftname, img, link, bought FROM bday`, function(res) {
            //     setGiftData(res.results);
            // });
        }
    }, [giftData]);

    console.log(giftData);
    
    return (
        <Layout page='bday'>
            <Head>
            <title>{`${siteTitle} || Birthday`}</title>
            <meta name="description" content="Holly's birthday things!" />
            <meta property="og:image" content={`https://hooleymcknight.com/images/lax_hero_preview.jpg`} />
            <meta name="og:title" content="Holly's birthday things!" />
            </Head>

            {/* <p>{repo.stargazers_count}</p> */}

            {repo.map(x => 
                <div key={x.giftname} className={styles['gift-item']}>
                    <h3>{x.giftname}</h3>
                    <div className="img-wrapper">
                        <img src={x.img} alt={x.giftname} />
                    </div>
                    <a href={x.link} alt={x.giftname}>Buy Here</a>
                    <div className="purchased">
                        <p>Click below to see if someone has purchased this yet.</p>
                        <button type="button" className="spoiler" onClick={(e) => showSpoiler(e)}>{Number(x.bought) > 0 ? 'This has been purchased.' : 'This has not yet been purchased.'}</button>
                    </div>
                </div>
            )}

            <button type="button" onClick={tryAdd}>Add thing</button>

        </Layout>
    );
}
