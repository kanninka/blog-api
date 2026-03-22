const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});