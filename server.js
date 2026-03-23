const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
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

const app = express();

app.use(cors());
app.use(express.json());

const articleRoutes = require('./routes/articleRoutes');
app.use('/api', articleRoutes);

app.get('/', (req, res) => {
    res.send("API Blog fonctionne !");
});

const PORT = process.env.PORT || 3000;

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Blog",
      version: "1.0.0",
      description: "Documentation de l'API Blog"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"],
};
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  db.run(
    'INSERT INTO posts (title, content) VALUES (?, ?)',
    [title, content],
    function (err) {
      if (err) return res.status(500).send(err.message);

      res.json({ id: this.lastID, title, content });
    }
  );
});

app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);

    res.json(rows);
  });
});
app.put('/posts/:id', (req, res) => {
  const { title, content } = req.body;

  db.run(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, req.params.id],
    function (err) {
      if (err) return res.status(500).send(err.message);

      res.send('Post mis à jour');
    }
  );
});
app.delete('/posts/:id', (req, res) => {
  db.run(
    'DELETE FROM posts WHERE id = ?',
    [req.params.id],
    function (err) {
      if (err) return res.status(500).send(err.message);

      res.send('Post supprimé');
    }
  );
});
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});