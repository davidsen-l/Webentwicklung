const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  /*response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler */
  /*response.setHeader("Access-Control-Allow-Methods", "*"); // Erlaubt alle HTTP-Methoden */
  /*response.setHeader("Access-Control-Allow-Headers", "*"); // Erlaubt das Empfangen von Requests mit Headern, z. B. Content-Type */
  response.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server läuft unter http://${hostname}:${port}/`);
});

// SQLite Modul in Node.js Code verwenden
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

// SQLite Datei angeben
const dbFilePath = 'hochschule.db';

async function main() {
  // Mit Datenbank verbinden
  const db = await sqlite.open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  // Auf Datenbank zugreifen (z. B. SELECT Befehl)
  const students = await db.all('SELECT * FROM ausleihliste');
  console.log(students);

  // Verbindung zu Datenbank beenden
  await db.close();
}

main();