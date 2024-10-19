import express from 'express';
import { logRequest } from '../utils/utils.js';

const app = express();
const PORT = 8080;

app.use((req, res, next) => {
    console.log(logRequest(req, 'service1'));
    next();
})

app.get('/', (req, res) => {
    res.send('hello from server1');
})

app.listen(PORT, () => console.log(`Server1 listening on port: ${PORT}`));