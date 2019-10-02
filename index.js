const express = require('express');

const server = express();

const dataRouter = require('./db-router')

server.use(express.json());

server.use('/api/posts', dataRouter)

server.get('/', (req, res) => {
    res.send('hello')
})

const port = 5000;

server.listen(port, () => console.log(`\n** API on port ${port} **\n`));