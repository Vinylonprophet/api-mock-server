const _ = require('lodash');
const axios = require('axios');
const bodyParser = require('body-parser');
const connectBusboy = require('connect-busboy');
const cors = require('cors');
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
app.use(cors());

// --------------------Routes-------------------- //
const pocRouter = require('./poc');
app.use('', pocRouter);

app.post('/M/simple', (req, res) => {
    res.send('Test Mock Simple Route Post');
});

// --------------------Create Server-------------------- //
const port = 4500;
http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`Server start on port ${port}`);
});