import mysql from 'mysql2';

let db = mysql({
  host: '127.0.0.1',
  port: '3306',
  user: 'app',
  password: 'Beezus5263',
  database: 'site',
});

console.log(process.env.MYSQL_USER);

console.log(db);

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}