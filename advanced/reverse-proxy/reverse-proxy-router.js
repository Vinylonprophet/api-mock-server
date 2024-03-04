const express = require('express');
const reverseProxyRouter = express.Router();
const request = require('request');

reverseProxyRouter.route('/proxy/complex').get((req, res) => {
}).post((req, res) => {
    options = {
        'method': 'POST',
        'url': '',
        'proxy': '',
        'json': true,
        // 'body': body,
        'headers': {
            'refer': '',
            Accept: "application/json",
        }
    }

    request(options, function (error, response) {
        if (error) {
            console.log("Error: ", error);
        } else {
            console.log("VL", response.body);
            res.status(400).send(response.body);
        }
    })
});

module.exports = reverseProxyRouter;