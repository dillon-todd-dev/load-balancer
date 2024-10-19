import axios from 'axios';
import express from 'express';
import { logRequest } from './utils/utils.js';

const app = express();
const PORT = 80;

const backendServer = 'http://localhost:8080';

app.use((req, res, next) => {
    console.log(logRequest(req, 'load-balancer'));
    next();
});

app.get('*', async (req, res) => {
    try {
        const result = await axios.get(backendServer + req.url);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(500).send('Failed to connect to backend');
    }
});

app.listen(PORT, () => console.log(`load-balancer listening on port: ${PORT}`));