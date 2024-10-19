import express from 'express';

const app = express();
const PORT = 80;

app.use((req, res, next) => {
    console.log(`Received request from ${req.ip}\n${req.method} ${req.path} ${req.httpVersion}\nHost: ${req.hostname}\nUser-Agent: ${req.headers['user-agent']}\nAccept: ${req.headers.accept}`);
    next();
});

app.get('*', (req, res) => {
    res.status(200).send('this is the load balancer');
});

app.listen(PORT, () => console.log(`load-balancer listening on port: ${PORT}`));