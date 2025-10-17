// netlify/functions/get-products.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
    // Prevent function from waiting for event loop
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await client.connect();
        const db = client.db('menuDB');
        const collection = db.collection('categories');

        // Fetch all category documents
        const allCategories = await collection.find({}).toArray();

        // Structure the data similarly to how you imported JSONs
        const menuData = allCategories.reduce((acc, categoryDoc) => {
            acc[categoryDoc._id] = categoryDoc.data; // Assumes _id is 'cafe', 'bistro', etc.
            return acc;
        }, {});

        return {
            statusCode: 200,
            body: JSON.stringify(menuData),
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch products' }),
        };
    } finally {
        // Ensure client is closed after function execution or timeout
        await client.close();
    }
};