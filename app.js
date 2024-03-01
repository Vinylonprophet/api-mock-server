const _ = require('lodash');
const axios = require('axios');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const cors = require('cors');
const crypto = require('crypto');
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const glob = require('glob');
const http = require('http');
const https = require('http');
const path = require('path');
const proxy = require('express-http-proxy');
const request = require('request');
const urlRewrite = require('express-urlrewrite');

// --------------------Configuration-------------------- //
const app = express();
const router = express.Router();
app.use(cors());

// --------------------Routes-------------------- //
router.use((req, res, next) => {
    // Access-Control-Allow
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // // res.setHeader('Access-Control-Allow-Origin', 'https://www.google.com');
    // res.setHeader('Access-Control-Allow-Headers', '*');
    // // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, If-None-Match, Referer, Sec-Ch-Ua, Sec-Ch-Ua-Mobile, Sec-Ch-Ua-Platform, User-Agent');
    // res.setHeader('Access-Control-Allow-Methods', '*');
    // res.setHeader('Access-Control-Max-Age', '3600');

    res.setHeader('X-Custom-Header', 'Custom-Value');
    res.setHeader('Date', new Date().toUTCString());
    res.setHeader('Server', "VL's Server");

    if (req.method === 'GET') {
        res.setHeader('Cache-Control', 'public, max-age=3600');
    } else {
        res.setHeader('Cache-Control', 'no-store');
    }

    next();
});

router.route('/api/example')
    .get((req, res) => {
        // header
        res.setHeader('Content-Type', 'text/plain');
        // redirect
        const redirectTarget = req.query.redirect;
        // console.log(redirectTarget)
        // etag
        const etagContent = "VL's ETAGContent";
        const etag = crypto.createHash('md5').update(etagContent).digest('hex');
        console.log("ETag:", etag);
        const ifNoneMatch = req.headers['if-none-match'];

        if (ifNoneMatch === etag) {
            res.status(304).end();
        } else {
            res.setHeader('ETag', etag);
            const responseData = { message: 'GET request handled' };
            res.status(200).json(responseData);
        }
    })
    .post((req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const responseData = { message: 'POST request handled' };
        const responseBody = JSON.stringify(responseData);
        res.setHeader('Content-Length', Buffer.byteLength(responseBody));
        res.status(200).json(responseData);
    });

app.use('', router);
// --------------------Create Server-------------------- //
const port = 4500;
http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`Server start on port ${port}`);
});