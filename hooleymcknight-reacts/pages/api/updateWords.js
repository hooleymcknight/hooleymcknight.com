import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const wordsData = req.body.data;

    if (req.body.type === 'add') {
        await fs.writeFile('./pages/api/words.json', JSON.stringify(wordsData))
        .then(res => {
            res.statusCode = 200;
            res.pantaloons = 'no';
            res.end(JSON.stringify(res));
        })
        .catch(error => {
            res.json(error);
            res.status(405).end();
        });
    }
}