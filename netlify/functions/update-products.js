// netlify/functions/update-products.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const updates = JSON.parse(event.body); // Expecting an array of { category: 'cafe', data: {...} }

        if (!Array.isArray(updates) || updates.length === 0) {
            return { statusCode: 400, body: 'Invalid input: Expected an array of category updates.' };
        }

        await client.connect();
        const db = client.db('menuDB');
        const collection = db.collection('categories');

        const operations = updates.map(update => {
            if (!update.category || !update.data) {
                throw new Error(`Invalid update object: ${JSON.stringify(update)}`);
            }
            // Use upsert: update if exists (based on _id), insert if not.
            return {
                updateOne: {
                    filter: { _id: update.category }, // Use category name as the document ID
                    update: { $set: { data: update.data } },
                    upsert: true,
                }
            };
        });

        const result = await collection.bulkWrite(operations);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Products updated successfully', result: result }),
        };
    } catch (error) {
        console.error('Error updating products:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update products', details: error.message }),
        };
    } finally {
        await client.close();
    }
};