const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function getCategories() {
    try {
        await client.connect();
        const database = client.db('isen_drive');
        const collection = database.collection('categories');

        return await collection.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'products'
                }
            },
            {
                $addFields: {
                    size: {$size: "$products"}
                }
            },
            {
                $project: {
                    _id: {$toString: '$_id'},
                    name: 1,
                    size: 1,
                    products: 1
                }
            }
        ]).toArray();
    } catch (error) {
        console.error('Error in getCategories:', error);
    } finally {
        await client.close();
    }
}

async function getProducts() {
    try {
        await client.connect();
        const database = client.db('isen_drive');
        const collection = database.collection('products');

        return await collection.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    description: 1,
                    categoryId: 1,
                    categoryName: '$category.name'
                }
            }
        ]).toArray();
    } catch (error) {
        console.error('Error in getCategories:', error);
    } finally {
        await client.close();
    }
}


/*getCategories()
    .then(console.log)
    .catch(console.error);*/

/*getProducts()
    .then(console.log)
    .catch(console.error)*/

module.exports = {
    getCategories,
    getProducts
};


