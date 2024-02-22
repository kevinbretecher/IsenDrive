const express = require('express');
const router = express.Router();
const category = require("/Users/kevinbretecher/NodeTp/isen_drive/model/Category.js");
const product = require("/Users/kevinbretecher/NodeTp/isen_drive/model/Product.js")

router.get('/new', async (req, res) => {
    res.render('productForm', {title: "Créer un produit", categories: await category.getAll()});
});

router.get('/:id', async (req, res) => {
    res.render('productDescription', {products: await product.getByProduct(req.params.id), title: "Description du produit - " + await product.getByProduct(req.params.id)[0].name});
});

router.get('/:id/update', async (req, res) => {
    res.render('productUpdate', {products: await product.getByProduct(req.params.id), title: "Modification du produit : " + await product.getByProduct(req.params.id)[0].name, categories: await category.getAll()});
});

router.get('/:id/delete', async (req, res) => {
    res.render('productDelete', {products: await product.getByProduct(req.params.id), title: "Suppression du produit : " + await product.getByProduct(req.params.id)[0].name, categories: await category.getAll()});
});

module.exports = router;