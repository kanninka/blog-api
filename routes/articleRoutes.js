const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/articleController');

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               auteur:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Article créé
 */
router.post('/articles', controller.createArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     responses:
 *       200:
 *         description: Liste des articles
 */
router.get('/articles', controller.getArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Article trouvé
 */
router.get('/articles/:id', controller.getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article
 */
router.put('/articles/:id', controller.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 */
router.delete('/articles/:id', controller.deleteArticle);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles
 */
router.get('/articles/search', controller.searchArticles);
router.post('/articles', controller.createArticle);
router.get('/articles', controller.getArticles);
router.get('/articles/search', controller.searchArticles);
router.get('/articles/:id', controller.getArticleById);
router.put('/articles/:id', controller.updateArticle);
router.delete('/articles/:id', controller.deleteArticle);

module.exports = router;