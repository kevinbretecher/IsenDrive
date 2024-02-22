const express = require('express');
const router = express.Router();
const category = require("/Users/kevinbretecher/NodeTp/isen_drive/model/Category.js");
const product = require("/Users/kevinbretecher/NodeTp/isen_drive/model/Product.js")

router.get('/new', async (req, res) => {
    res.render('categoryForm', {title: "Créer un rayon"});
});

router.get('/', async (req, res) => {
    res.render('categories', {categories: await category.getAll(), title: "Rayons"})
});

router.get('/:id', async (req, res) => {
    const categoryId = req.params.id;
    const getProduct = await product.getByCategory(categoryId);
    const getCategory = await category.getById(categoryId);
    res.render('category', {products: getProduct, title: "Produits du rayon " + getCategory.name, categoryId :categoryId})
});

router.get('/:id/update', async (req, res) => {
    const categoryId = req.params.id;
    const getCategory = await category.getById(categoryId);
    res.render('categoryUpdate', {categories: getCategory, title: "Modification du rayon : " + getCategory.name})
});

router.get('/:id/delete', async (req, res) => {
    const categoryId = req.params.id;
    const getCategory = await category.getById(categoryId);
    res.render('categoryDelete', {categories: getCategory, title: "Suppression du rayon : " + getCategory.name})
});

module.exports = router;