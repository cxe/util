#!/usr/bin/env sh

# @usage FOO="$(findUpwardFile foo.txt)"
findUpward() {
    echo "$(f=/$1; d="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"; while [ "$d" != "/" ]; do [ -f "$d$f" ] && echo "$d$f"; d="$(dirname "$d")"; done)"
}

# @usage package_json version
package_json() {
    local file="$(findUpward package.json)"
    node -e "process.stdout.write('$1'.split('.').reduce((p,c)=>p && p[c], require('${file}')))"
}
