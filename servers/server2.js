import express from 'express';
import { logRequest } from '../utils/utils.js';

const app = express();
const PORT = 8081;

app.use((req, res, next) => {
    console.log(logRequest(req, 'service2'));
    next();
})

app.get('/', (req, res) => {
    res.send('hello from server2');
})

app.listen(PORT, () => console.log(`Server2 listening on port: ${PORT}`));