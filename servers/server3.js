import express from 'express';

const app = express();
const PORT = 8082;

app.get('/', (req, res) => {
    res.send('hello from server3');
})

app.listen(PORT, () => console.log(`Server3 listening on port: ${PORT}`));