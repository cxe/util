//usr/bin/env docker run -e "DOCKERIZED=$( docker version --format '{{.Server.Version}}' )" --rm --init -it -p 8080:8080 -v "$PWD":"$PWD" -w "$PWD" node:latest ${1:-node "$PWD/${0#./}"}; exit;

/**
 * @use:
 *   No need to install npm or node locally - all you need is `docker` to run this dockerized node service from a single file due to the bash-js-comment at the top.
 *   Make this file runnable `chmod +x self-dockerizing.js` then you can just start it `./self-dockerizing.js` and it will run in docker under the same path.
 *   As this is an interactive docker terminal you can also proxy any other command through docker e.g. `./run ls -la`
 *   To run the same file locally use `node run`.
 */
require('http').createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
    console.info(res.statusCode, req.url);
}).listen(8080, _ => console.info(`${process.env.DOCKERIZED ? 'dockerized' : 'local'} NodeJS ${process.versions.node} running at http://localhost:8080/`));
