const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

// --------------------Configuration-------------------- //
const app = express();
const router = express.Router();

app.use(bodyParser.json());

// ==================== CORS MiddleWare ====================
// const corsOptions = {
//     origin: 'https://www.google.com',
//     credentials: true,
// };
// app.use(cors(corsOptions));

// --------------------Routes-------------------- //
const intermediateRouter = require('./intermediate-router.js');
app.use('', intermediateRouter);

// --------------------Create Server-------------------- //
const port = 4500;
http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`Server start on port ${port}`);
});