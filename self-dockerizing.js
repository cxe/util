//usr/bin/env [ ${NODE_ENV:='development'} ] && app() { local v=$(awk "/\"$1\"\:/{print \$NF}" package.json | tr -d \",); [ $v ] && echo $v || echo $2; }
//usr/bin/env [ -d .git ] && IMAGE="$(app name $(basename $PWD))-$(app version 1.0.0)-$(git rev-parse --short HEAD)"
//usr/bin/env [ ${NODE_VERSION:=$(app node 14)} ]; [ -f Dockerfile ] && docker build . -t ${IMAGE:="$(app name $(basename $PWD))-$(app version 1.0.0)" } || IMAGE="node:$NODE_VERSION"
//usr/bin/env [ $(which docker) ] && docker run --rm --init -it -v "$PWD":"$PWD" -w "$PWD" node:${NODE_VERSION} ${@:-node $PWD/$0}; exit;

/**
 * simple self-dockerizing node server
 * + no need to install node, npm, nvm - all you need to run locally using the correct node version specified in the package.json (engines.node) is docker
 * + runnable as a single file due to the first line being a JS comment that is bash executable
 *
 * @use:
 *   Rename `self-dockerizing.js` to something more usable e.g. `app.js`
 *   Make this file runnable `chmod +x app.js` then you can just start it using `./app.js` and it will run in docker under the same path.
 *   As this is an interactive docker terminal you can also proxy any other command through docker e.g. `./app.js bash`
 *   To run the same file without docker use the normal `node app.js`.
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
