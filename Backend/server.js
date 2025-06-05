/*const http = require('http'); 
const sqlite3 = require('sqlite3'); 
const sqlite = require('sqlite'); 
const { parse } = require('url'); 
const hostname = '127.0.0.1'; // localhost 
const port = 3000; 
const dbFilePath = 'testDb.db'; 
let db; 

async function initDb() { 
  db = await sqlite.open({ 
    filename: dbFilePath, 
    driver: sqlite3.Database, 
  }); 

  await db.run(` 
    CREATE TABLE IF NOT EXISTS ausleihliste ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      book TEXT, 
      name TEXT, 
      date TEXT 
    )
  `); 
} 

const server = http.createServer((request, response) => { 
  const { pathname } = parse(req.url, true); 
  const method = req.method; 

  response.setHeader('Content-Type', 'application/json'); 
  response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler 
  response.setHeader("Access-Control-Allow-Methods", "*"); // Erlaubt alle HTTP-Methoden 
  response.setHeader("Access-Control-Allow-Headers", "*"); // Erlaubt das Empfangen von Requests mit Headern, z. B. Content-Type  

  if (method === 'OPTIONS') { 
    res.writeHead(204); 
    return res.end(); 
  //response.end(JSON.stringify(rows)); 
}; 

// GET /api/ausleihliste 
  if (pathname === '/api/ausleihliste' && method === 'GET') { 
    const rows = await db.all('SELECT * FROM ausleihliste'); 
    res.writeHead(200, { 'Content-Type': 'application/json' }); 
    return res.end(JSON.stringify(rows)); 
  } 

  // POST /api/ausleihliste 
  if (pathname === '/api/ausleihliste' && method === 'POST') { 
    let body = ''; 
    req.on('data', chunk => body += chunk); 
    req.on('end', async () => { 
      const data = JSON.parse(body); 
      await db.run( 
        'INSERT INTO ausleihliste (book, name, date) VALUES (?, ?, ?)', 
        data.book, data.name, data.date 
      ); 
      res.writeHead(201); 
      res.end(JSON.stringify({ success: true })); 
    }); 

    return; 
  } 

  // DELETE /api/ausleihliste/:id 
  const deleteMatch = pathname.match(/^\/api\/ausleihliste\/(\d+)$/); 
  if (deleteMatch && method === 'DELETE') { 
    const id = deleteMatch[1]; 
    await db.run('DELETE FROM ausleihliste WHERE id = ?', id); 
    res.writeHead(204); 
    return res.end(); 
  } 

  // Fallback 
  res.writeHead(404, { 'Content-Type': 'application/json' }); 
  res.end(JSON.stringify({ message: 'Nicht gefunden' })); 
}); 

 

// Server starten 
initDb().then(() => { 
  server.listen(port, hostname, () => { 
    console.log(`Server läuft unter http://${hostname}:${port}/`); 
  }); 
}); 

server.listen(port, hostname, () => { 
  console.log(`Server läuft unter http://${hostname}:${port}/`); 
}); 
 
// SQLite Modul in Node.js Code verwenden 
const sqlite3 = require('sqlite3'); 
const sqlite = require('sqlite'); 
 
// SQLite Datei angeben 
const dbFilePath = 'testDb.db';

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

main();*/
const http = require('http');
const url = require('url');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const hostname = '127.0.0.1'; // localhost
const port = 5000;

let db;

async function startServer() {
  db = await sqlite.open({
    filename: './data/ausleihliste.db',
    driver: sqlite3.Database
  });

    await db.run(` 
    CREATE TABLE IF NOT EXISTS ausleihliste ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      book TEXT, 
      name TEXT, 
      date TEXT 
    )
  `); 

const server = http.createServer(async(request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const pathname = parsedUrl.pathname;
  const method = request.method;
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler
  response.setHeader("Access-Control-Allow-Methods", "*"); // Erlaubt alle HTTP-Methoden 
  response.setHeader("Access-Control-Allow-Headers", "*"); // Erlaubt das Empfangen von Requests mit Headern, z. B. Content-Type 

  if (method === 'OPTIONS') {
    response.writeHead(204);
    return response.end();
  }


// GET /api/ausleihliste 
  if (pathname === '/api/ausleihliste' && method === 'GET') { 
    const rows = await db.all('SELECT * FROM ausleihliste'); 
    response.writeHead(200, { 'Content-Type': 'application/json' }); 
    return response.end(JSON.stringify(rows)); 
  } 

  // POST /api/ausleihliste 
  if (pathname === '/api/ausleihliste' && method === 'POST') { 
    let body = ''; 
    request.on('data', chunk => body += chunk); 
    request.on('end', async () => { 
      const data = JSON.parse(body); 
      await db.run( 
        'INSERT INTO ausleihliste (book, name, date) VALUES (?, ?, ?)', 
        data.book, data.name, data.date 
      ); 
      response.writeHead(201); 
      response.end(JSON.stringify({ success: true }));  
       });
    return; 
  } 

  // DELETE /api/ausleihliste/:id 
  const deleteMatch = pathname.match(/^\/api\/ausleihliste\/(\d+)$/); 
  if (deleteMatch && method === 'DELETE') { 
    const id = deleteMatch[1]; 
    await db.run('DELETE FROM ausleihliste WHERE id = ?', id); 
    response.writeHead(204); 
    return response.end(); 
  } 

  // Fallback: 404
    response.writeHead(404);
    response.end('Nicht gefunden');

});
 
 server.listen(port, hostname, () => {
  console.log(`Server läuft unter http://${hostname}:${port}/`);
});
};
startServer();