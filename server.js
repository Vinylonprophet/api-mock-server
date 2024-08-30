const express = require('express');
const { ObjectId } = require('mongodb');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = 4500;

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

let database;

// 服务器启动时连接数据库
async function connectToDB() {
    try {
        await client.connect();
        database = client.db('crawler');
        console.log('Connected successfully to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // 退出进程，表示连接失败
    }
}

// 服务器关闭时关闭数据库连接
process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('Disconnected from MongoDB');
        process.exit(0); // 正常退出进程
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        process.exit(1); // 退出进程，表示关闭失败
    }
});

app.get('/v1/getCollectionCount', async (req, res) => {
    try {
        const { collectionName, queryParams = {} } = req.query;

        let query = queryParams;
        if (typeof queryParams === 'string') {
            try {
                query = JSON.parse(queryParams);
            } catch (error) {
                return res.status(400).json({ error: 'Invalid queryParams format' });
            }
        }

        const collection = database.collection(collectionName);
        const count = await collection.countDocuments(query);

        res.json({ collectionName, documentCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    }
});

app.post('/v1/syncDBStatus', async (req, res) => {
    const { collectionName, id, isPending = false } = req.body;
    if (!collectionName || !id) {
        return res.status(400).json({ error: 'Collection name and id are required' });
    }

    try {
        const collection = database.collection(collectionName);
        const filter = { _id: new ObjectId(id) };
        let updateDoc = {
            $set: { 'db_status': "DB_SYNC" },
        };
        if (isPending) {
            updateDoc = {
                $set: { 'db_status': "PENDING" },
            };
        } else {
            updateDoc = {
                $set: { 'db_status': "DB_SYNC" },
            };
        }

        const result = await collection.updateOne(filter, updateDoc);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Document not found or db_status not modified' });
        }

        res.status(200).json({ message: 'Property updated successfully', result, status: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/v1/getArticleDetail', async (req, res) => {
    const { title } = req.body;

    if (title !== '') {
        try {
            data = require('./articles/' + title + '.json')
            return res.status(200).json({ status: 200, data: data });
        } catch (e) {
            return res.status(400);
        }
    } else {
        return res.status(400);
    }
});


// 启动服务器并连接数据库
app.listen(port, async () => {
    await connectToDB();
    console.log(`Server running at http://localhost:${port}`);
});
