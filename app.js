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

// 调用express()函数会创建一个Express应用。
// 这个应用可以被视为一个请求处理器，它在接收到HTTP请求时可以执行各种操作（如路由决策、发送响应等）。
// 将这个新创建的Express应用赋值给app变量。这样，app变量就可以被用来配置应用（通过中间件）、添加路由处理器等。
const app = express();
const router = express.Router();
const port = 4500;
http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`Server start on port ${port}`);
});

// 路由定义（简单版）
app.post('/', (req, res) => {
    res.send('Hello, World!');
});