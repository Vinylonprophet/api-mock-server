const express = require('express');
const crypto = require('crypto');
const intermediateRouter = express.Router();

intermediateRouter.use((req, res, next) => {
    // Access-Control-Allow
    res.setHeader('Access-Control-Allow-Origin', 'https://www.google.com');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Referer, Sec-Ch-Ua, Sec-Ch-Ua-Mobile, Sec-Ch-Ua-Platform, User-Agent');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '3600');

    // Expose Header
    res.setHeader('Access-Control-Expose-Headers', 'Server, Location');

    // X-Custom-Header
    res.setHeader('X-Custom-Header', 'Custom-Value');

    // Server
    res.setHeader('Server', "VL's Mock Server");

    // Date
    res.setHeader('Date', new Date().toUTCString());

    // Set-Cookie
    res.cookie('access-token', 'dream-legacy', { httpOnly: true, secure: true, sameSite: 'None' });

    // Cache-Control
    if (req.method === 'GET') {
        res.setHeader('Cache-Control', 'public, max-age=3600');
    } else {
        res.setHeader('Cache-Control', 'no-store');
    }

    next();
});

intermediateRouter.route('/api/example')
    .get((req, res) => {
        const responseData = { message: 'GET request handled' };

        // Content-Length
        res.setHeader('Content-Length', Buffer.byteLength(JSON.stringify(responseData)));

        // ETag
        const etagContent = "VL's Mock Server";
        const etag = crypto.createHash('md5').update(etagContent).digest('hex');
        const ifNoneMatch = req.headers['if-none-match'];

        // redirect
        const redirectTarget = req.query.redirect;

        // download
        const download = req.headers['download'];

        if (ifNoneMatch === etag) {
            res.status(304).end();
        } else if (redirectTarget) {
            // Location
            res.redirect(302, redirectTarget);
            // ==================== Equivalent result as the code below ====================
            // res.setHeader('Location', redirectTarget);
            // res.status(302).end();
        } else if (download === 'true') {
            // Content-Disposition
            res.setHeader('Content-Disposition', 'attachment; filename="example.txt"');

            res.setHeader('Content-Type', 'text/plain');

            const responseData = 'This is the content of the example file.';
            res.status(200).send(responseData);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(responseData);
        }
    })
    .post((req, res) => {
        const responseData = { message: 'POST request handled' };
        res.status(200).json(responseData);
    })

module.exports = intermediateRouter;