//usr/bin/env docker run --rm -it -p ${PORT:=80}:$PORT -e "PORT=$PORT" -v "$PWD":"$PWD" -w "$PWD" node:latest node "$PWD/${0#./}" && exit

const { log } = console;
const { PORT = 80 } = process.env;

const server = require('http').createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(PORT, () => {
    log(`Server running at http://localhost:${PORT}/`);
});
