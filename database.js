const sqlite3 = require('sqlite3').verbose();

// Création ou ouverture de la base
const db = new sqlite3.Database('./blog.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connexion à SQLite réussie');
  }
});

module.exports = db;