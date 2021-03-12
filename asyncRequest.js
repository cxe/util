const request = (url, options = {}) => {
    let { method = 'GET' } = options || {};
    method = String(method).toUpperCase();
    const _url = new URL(url);
    const { href, origin, protocol, username, password, host, hostname, port, pathname: path, search, searchParams, hash } = _url;
    const schema = protocol.slice(0, -1);
    if (!['http:', 'https:'].includes(protocol)) throw `unsupported protocol: ${protocol}`;
    if (!['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'CONNECT', 'TRACE', 'PATCH'].includes(method)) throw 'unsupported method';

    // @see https://nodejs.org/api/http.html#http_http_request_options_callback
    return new Promise((resolve, reject) => {
        const opt = { method };
        if (options.headers) opt.headers = options.headers;

        const req = require(schema).request(_url, opt,
            (res) => {
                const chunks = [];
                let onChunk = chunks.push.bind(chunks);
                if (typeof options.onChunk === 'funtion') {
                    onChunk = chunk => chunks.push(options.onChunk(chunk));
                }
                res.on('data', onChunk);
                res.on('error', reject);
                res.on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    const result = {
                        statusCode: res.statusCode,
                        headers: res.headers,
                        content: options.binary ? buffer.toString('base64') : buffer.toString()
                    };

                    if (res.statusCode >= 200 && res.statusCode <= 400) {
                        resolve(options.only ? result[options.only] : result);
                    } else {
                        reject(options.only ? result[options.only] : result);
                    }
                });
            });
        req.on('error', reject);
        if (options.data) req.write(options.data, 'binary');
        req.end();
    });
};
