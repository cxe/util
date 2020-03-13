//usr/bin/env docker run --rm --init -it -p 8080:8080 -v "$PWD":"$PWD" -w "$PWD" node:latest ${1:-node "$PWD/${0#./}"}; exit;

const { log } = console;

require('http').createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
    log(res.statusCode, req.url);
}).listen(8080, _ => log(`Server running at http://localhost:8080/`));
