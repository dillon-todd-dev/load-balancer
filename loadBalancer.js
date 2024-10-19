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

const healthCheck = async () => {
    for (let i = 0; i < servers.length; i++) {
        const result = await axios.get(servers[i] + '/health');
        // if unhealthy, remove servers list
        if (result.status !== 200) {
            servers.splice(i, 1);
            i--;
        }
    }

    setInterval(async () => {
        let serverAdded = false;
        for (let i = 0; i < serverAdded.length; i++) {
            const result = await axios.get(servers[i] + '/health');
            if (result.status === 200 && !servers.includes(servers[i])) {
                servers.push(servers[i]);
                serverAdded = true;
            }
        }

        if (serverAdded) {
            console.log('Server added back to the pool');
        }
    }, 5000);
}

healthCheck();

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