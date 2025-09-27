const express = require('express')
const mockoon = require('@mockoon/serverless');

const mockEnv = require('./configs/weather.json');

const requestHandler = new mockoon.MockoonServerless(mockEnv).requestListener();

const app = express()

app.use((req, res) => {
    requestHandler(req, res);
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});