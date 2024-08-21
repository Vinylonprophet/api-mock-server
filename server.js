const express = require('express');
const { ObjectId } = require('mongodb');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/v1/getCollectionCount', async (req, res) => {
    try {
        await client.connect();
        const { collectionName, queryParams = {} } = req.query;

        let query = queryParams;
        if (typeof queryParams === 'string') {
            try {
                query = JSON.parse(queryParams);
            } catch (error) {
                return res.status(400).json({ error: 'Invalid queryParams format' });
            }
        }

        const database = client.db('crawler');
        const collection = database.collection(collectionName);

        const count = await collection.countDocuments(query);

        res.json({ collectionName, documentCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});

app.get('/v1/dataQuery', async (req, res) => {
    const { collectionName, limit = 20, skipCount = 0, sort = 'desc', queryParams = '{}' } = req.query;

    if (!collectionName) {
        return res.status(400).json({ error: 'Collection name is required' });
    }

    let query = queryParams;
    if (typeof queryParams === 'string') {
        try {
            query = JSON.parse(queryParams);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid queryParams format' });
        }
    }

    try {
        await client.connect();
        const database = client.db('crawler');
        const collection = database.collection(collectionName);

        const sortOrder = sort === 'asc' ? 1 : -1;

        const games = await collection.find(query)
            .sort({ _id: sortOrder })
            .skip(parseInt(skipCount))
            .limit(parseInt(limit))
            .toArray();

        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});

app.post('/v1/syncDBStatus', async (req, res) => {
    const { collectionName, id } = req.body;
    if (!collectionName || !id) {
        return res.status(400).json({ error: 'Collection name and id are required' });
    }

    try {
        await client.connect();
        const database = client.db('crawler');
        const collection = database.collection(collectionName);

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: { 'db_status': "DB_SYNC" },
        };

        const result = await collection.updateOne(filter, updateDoc);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Document not found or db_status not modified' });
        }

        res.status(200).json({ message: 'Property updated successfully', result, status: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});

app.listen(4500, () => {
    console.log(`Server running at http://localhost:${4500}`);
});
