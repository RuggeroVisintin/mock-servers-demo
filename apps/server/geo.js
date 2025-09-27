const express = require('express')
const mockoon = require('@mockoon/serverless');

const mockEnv = require('./configs/geo.json');

const requestHandler = new mockoon.MockoonServerless(mockEnv).requestListener();

const app = express()

app.use((req, res) => {
    requestHandler(req, res);
})

app.listen(3003, () => {
    console.log('Server is running on http://localhost:3003');
});