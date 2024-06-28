import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const wordsData = req.body.data;

    if (req.body.type === 'add') {
        await fs.writeFile('./pages/api/words.json', JSON.stringify(wordsData))
        .then(res => {
            res.statusCode = 200;
            res.end(JSON.stringify(res));
            // resolve();
        })
        .catch(error => {
            res.json(error);
            res.status(405).end();
            // resolve();
        });
    }
    // else {
    //     //
    //     await fs.readFile('./pages/api/words.json', 'utf-8')
    //     .then(res => {
    //         res.statusCode = 200;
    //         res.body.data = JSON.stringify(res);
    //         console.log(res);
    //         res.end(JSON.stringify(res));
    //         return
    //     })
    //     .catch(error => {
    //         res.json(error);
    //         res.status(405).end();
    //     });

    //     // try {
    //     //     const query = req.body.query
    //     //     const values = []
    //     //     const [data] = await db.execute(query, values)
    //     //     db.end()
    //     //     res.status(200).json({ results: data })
    //     // }
    //     // catch(error) {
    //     //     res.status(500).json({ error: error.message})
    //     // }
    // }
}