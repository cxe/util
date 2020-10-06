//usr/bin/env echo "NodeJS ${NODE_VERSION:=latest}" && if [ -f "$PWD/.env" ]; then source "$PWD/.env"; fi; docker run -e "PORT=${PORT:=8080}" -e "DOCKERIZED=1" --rm --init -it -p $PORT:$PORT -v "$PWD":"$PWD" -w "$PWD" node:$NODE_VERSION $( (( $# == 0 )) && echo "node $PWD/${0#./}" || echo "$@" ); exit;

/**
 * @use:
 *   No need to install npm or node locally - all you need is `docker` to run this dockerized node service from a single file due to the bash-js-comment at the top.
 *   Make this file runnable `chmod +x self-dockerizing.js` then you can just start it `./self-dockerizing.js` and it will run in docker under the same path.
 *   As this is an interactive docker terminal you can also proxy any other command through docker e.g. `./self-dockerizing.js bash`
 *   To run the same file locally use `node self-dockerizing.js`.
 */
const http = require('http');
const { PORT = 8080 } = process.env;
const route = {
    '/': async (req, res) => {
        res.write('Hello World');
    }
};
http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    if (route[url.pathname]) {
        res.statusCode = 200;
        await route[url.pathname](req, res);
    }
    res.statusMessage = http.STATUS_CODES[res.statusCode] || '';
    if (!res.writableEnded) res.end();
    console.debug(res.statusCode, req.method, req.url);
}).listen(PORT, error => console[error ? 'error' : 'info'](error || `${process.env.DOCKERIZED ? 'dockerized' : 'local'} NodeJS ${process.versions.node} running at http://localhost:${PORT}/`));
