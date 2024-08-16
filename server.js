const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/v1/getAllCollections', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('crawler');
        const collections = await database.listCollections().toArray();
        res.json(collections.map(c => c.name));
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});

app.get('/v1/dataQuery', async (req, res) => {
    const { collectionName, limit = 20, sort = 'desc' } = req.query;

    if (!collectionName) {
        return res.status(400).json({ error: 'Collection name is required' });
    }

    try {
        await client.connect();
        const database = client.db('crawler');
        const collection = database.collection(collectionName);

        // 根据排序参数设置排序规则
        const sortOrder = sort === 'asc' ? 1 : -1;

        // 查询数据库，按指定数量和排序返回结果
        const games = await collection.find()
            .sort({ _id: sortOrder })  // 按 _id 字段排序，最新的数据在前
            .limit(parseInt(limit))
            .toArray();

        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});

app.listen(4500, () => {
    console.log(`Server running at http://localhost:${4500}`);
});
