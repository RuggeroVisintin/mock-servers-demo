const express = require('express')
const mockoon = require('@mockoon/serverless');

const mockEnv = require('./configs/weather.json');

const requestHandler = new mockoon.MockoonServerless(mockEnv).requestListener();

const app = express()

function modifyResponseMiddleware(req, res, next) {
    const oldSend = res.send;
    res.send = function (data) {
        console.info('Modifying response body...');
        if (typeof data === 'string') {
            data = data.replaceAll('$/now/$', Date.now().toString());
        }
        return oldSend.call(this, data);
    };
    next();
}

app.use(modifyResponseMiddleware);
app.use((req, res) => {
    requestHandler(req, res);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});