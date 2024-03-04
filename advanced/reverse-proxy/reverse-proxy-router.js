const express = require('express');
const reverseProxyRouter = express.Router();
const request = require('request');

reverseProxyRouter.route('/reverse-proxy').get((req, res) => {
    const body = {
        example1,
        example2
    } = req.body;

    body.example1 = 'example1';
    body.exampl21 = 'example2';

    options = {
        'method': 'GET',
        'url': '',
        'proxy': '',
        'json': true,
        'body': body,
        'headers': {
            'referer': '',
            Accept: "application/json",
        }
    }

    request(options, function (error, response) {
        if (error) {
            console.log("Error: ", error);
            res.status(500).send("Internal Server Error");
        } else {
            let resCookies = response.headers['set-cookie'];
            resCookies.forEach(cookie => {
                res.append('Set-Cookie', `${cookie}; SameSite=None; Secure`);
            });
            res.status(200).send(response.body);
        }
    })
});

module.exports = reverseProxyRouter;