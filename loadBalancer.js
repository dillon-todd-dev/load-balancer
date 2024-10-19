import axios from 'axios';
import express from 'express';
import { logRequest } from './utils/utils.js';

const app = express();
const PORT = 80;

let index = 0;

const servers = ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'];

const getNextServer = () => {
    if (index >= servers.length) {
        index = 0;
    }
    return servers[index++];
}

app.use((req, res, next) => {
    console.log(logRequest(req, 'load-balancer'));
    next();
});

app.get('*', async (req, res) => {
    const server = getNextServer();
    try {
        const result = await axios.get(server + req.url);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(500).send('Failed to connect to backend');
    }
});

app.listen(PORT, () => console.log(`load-balancer listening on port: ${PORT}`));