const cors = require('cors');
const express = require('express');
const http = require('http');

// --------------------Configuration-------------------- //
const app = express();
app.use(cors());

// --------------------Routes-------------------- //
const beginnerRouter = require('./beginner-router');
app.use('', beginnerRouter);

app.post('/M/simple', (req, res) => {
    res.send('Test Mock Simple Route Post');
});

// --------------------Create Server-------------------- //
const port = 4500;
http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`Server start on port ${port}`);
});