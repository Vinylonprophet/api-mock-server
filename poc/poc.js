const express = require('express');
const pocRouter = express.Router();

pocRouter.route('/M/complex').get((req, res) => {
    res.send('Test Mock Complex Route Get');
}).post((req, res) => {
    res.send('Test Mock Complex Route Post');
});

const pocJSON = require('./poc.json');
pocRouter.route('/M/poc').get((req, res) => {
    res.json({
        'method': 'get'
    });
}).post((req, res) => {
    res.json(pocJSON);
});

module.exports = pocRouter;