const { MongoClient, ObjectId } = require('mongodb');
const { getProducts } = require("../mongoDbTests.js");

const Product = {

    getByProduct : function (productId) {
        return this.getAll().filter(product => product._id === productId);
    },

    getByCategory : async function(categoryId) {
        try {
            const products = await this.getAll();
            return products.filter(product => product.categoryId.equals(new ObjectId(categoryId)));
        } catch (e) {
            console.error(e);
        }
    },

    getAll : async function() {
        return await getProducts();
   }

}

module.exports = Product;
