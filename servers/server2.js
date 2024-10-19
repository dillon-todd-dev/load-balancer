import express from 'express';

const app = express();
const PORT = 8081;

app.get('/', (req, res) => {
    res.send('hello from server2');
})

app.listen(PORT, () => console.log(`Server2 listening on port: ${PORT}`));