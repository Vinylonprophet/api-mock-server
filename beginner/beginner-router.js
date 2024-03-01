const express = require('express');
const beginnerRouter = express.Router();

beginnerRouter.route('/M/complex').get((req, res) => {
    res.send('Test Mock Complex Route Get');
}).post((req, res) => {
    res.send('Test Mock Complex Route Post');
});

const beginnerJSON = require('./beginner.json');
beginnerRouter.route('/M/beginner').get((req, res) => {
    res.json({
        'method': 'get'
    });
}).post((req, res) => {
    res.json(beginnerJSON);
});

module.exports = beginnerRouter;