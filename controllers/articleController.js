exports.createArticle = (req, res) => {};
exports.getAllArticles = (req, res) => {};
exports.getArticleById = (req, res) => {};
exports.updateArticle = (req, res) => {};
exports.deleteArticle = (req, res) => {};
const { articles } = require('../models/articleModel');
const { v4: uuidv4 } = require('uuid');

// CREATE
exports.createArticle = (req, res) => {
    if (!req.body) {
    return res.status(400).json({ message: "Body manquant" });
}
    const { titre, contenu, auteur, categorie, tags } = req.body;

    if (!titre || !auteur) {
        return res.status(400).json({ message: "Titre et auteur obligatoires" });
    }

    const newArticle = {
        id: uuidv4(),
        titre,
        contenu,
        auteur,
        categorie,
        tags,
        date: new Date()
    };

    articles.push(newArticle);
    res.status(201).json(newArticle);
};

// GET ALL
exports.getArticles = (req, res) => {
    res.status(200).json(articles);
};

// GET ONE
exports.getArticleById = (req, res) => {
    const article = articles.find(a => a.id === req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });

    res.json(article);
};

// UPDATE
exports.updateArticle = (req, res) => {
    const article = articles.find(a => a.id === req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });

    Object.assign(article, req.body);
    res.json(article);
};

// DELETE
exports.deleteArticle = (req, res) => {
    const index = articles.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Article non trouvé" });

    articles.splice(index, 1);
    res.json({ message: "Article supprimé" });
};

// SEARCH
exports.searchArticles = (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ message: "Paramètre query manquant" });
    }

    const results = articles.filter(a =>
        a.titre.toLowerCase().includes(query.toLowerCase()) ||
        a.contenu.toLowerCase().includes(query.toLowerCase())
    );

    res.json(results);
};
exports.createArticle = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Body manquant" });
    }

    const { titre, contenu, auteur, categorie, tags } = req.body;

    if (!titre || !auteur) {
        return res.status(400).json({ message: "Titre et auteur obligatoires" });
    }

    const newArticle = {
        id: uuidv4(),
        titre,
        contenu,
        auteur,
        categorie,
        tags,
        date: new Date()
    };

    articles.push(newArticle);
    res.status(201).json(newArticle);
};

