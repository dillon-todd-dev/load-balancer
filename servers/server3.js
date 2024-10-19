import express from 'express';
import { logRequest } from '../utils/utils.js';

const app = express();
const PORT = 8082;

app.use((req, res, next) => {
    console.log(logRequest(req, 'server3'));
    next();
})

app.get('/', (req, res) => {
    res.send('hello from server3');
})

app.listen(PORT, () => console.log(`Server3 listening on port: ${PORT}`));