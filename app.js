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

// const corsOptions = {
//     origin: 'https://www.google.com',
//     credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// --------------------Routes-------------------- //
// router.use((req, res, next) => {
//     next();
// });

// router.route('')
//     .get((req, res) => {
//     })
//     .post((req, res) => {
//     });

app.use('', router);
// --------------------Create Server-------------------- //
const port = 4500;
http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`Server start on port ${port}`);
});