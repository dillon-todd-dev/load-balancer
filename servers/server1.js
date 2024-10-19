import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('hello from server1');
})

app.listen(PORT, () => console.log(`Server1 listening on port: ${PORT}`));