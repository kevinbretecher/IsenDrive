const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const morgan = require('morgan');
const router = require("/Users/kevinbretecher/NodeTp/isen_drive/routes/index.js");
const routerCategory = require("/Users/kevinbretecher/NodeTp/isen_drive/routes/categories.js");
const routerProduct = require("/Users/kevinbretecher/NodeTp/isen_drive/routes/products.js");

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use("/", router);
app.use("/categories", routerCategory);
app.use("/products", routerProduct);
app.use(morgan('tiny'));
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});