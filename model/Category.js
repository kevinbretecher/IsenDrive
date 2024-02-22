const Product = require("./Product.js")
const { getCategories } = require("../mongoDbTests.js");
const {MongoClient, ObjectId} = require("mongodb");

const Category = {

    getById : async function(categoryId) {
        try {
            const categories = await this.getAll();
            //console.log(categories.find(category => category._id.toString() === categoryIdString));
            return categories.find(category => category._id === categoryId);
        }catch (error){
            console.error(error);
            return null;
        }
    },

    getAll : async function(){
        try {
            return await getCategories();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

}

module.exports = Category;
