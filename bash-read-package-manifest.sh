#!/usr/bin/env bash

readonly DIR="${BASH_SOURCE%/*}"; if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
export readonly APP_ROOT="$(dirname $DIR)"

# read the package.json manifest into env variables
[ -f "$APP_ROOT/package.json" ] && eval $(node <<-EOF
const manifest = require("$APP_ROOT/package.json");
const toEnv = (o, prefix, mods='') => {
    const regexQuote = /"/g;
    const write = (...args) => { console.log('export', args.join('')); };
    for (const key in o) {
        const name = \`\${prefix}_\${key.toUpperCase()}\`;
        const v = o[key];
        switch (typeof v) {
            case 'object':
                if (v) {
                    if (Array.isArray(v)) {
                        for (let i=0, n=v.length; i<n; ++i)
                            write(name, '_', i, '="', v[i], '"');
                    } else toEnv(v, name, mods);
                } else {
                    write(name, '=""'); // null
                }
                break;
            case 'number':
                write(name, '=', v);
                break;
            default:
                write(name, '="', String(v).replace(regexQuote, '\\"'), '"');
                break;
        }
    }
}
toEnv(require("$APP_ROOT/package.json"), 'APP');
EOF
)
