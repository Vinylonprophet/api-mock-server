const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

// --------------------Configuration-------------------- //
const app = express();
app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://www.google.com',
    credentials: true,
};
app.use(cors(corsOptions));

// --------------------Routes-------------------- //
const reverseProxy = require('./reverse-proxy/reverse-proxy-router');
app.use('', reverseProxy);

// --------------------Create Server-------------------- //
const port = 4500;
http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`Server start on port ${port}`);
});