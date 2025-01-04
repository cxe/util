#!/usr/bin/env sh

__DIRNAME="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

stderrRed(){
  exec 3>&2; exec 2> >(sed -u 's/^\(.*\)$/'$'\e''[31m\1'$'\e''[m/' >&3)
}

# @usage package_json version
package_json() {
    local file="$(readUpwardFile package.json)"
    node -e "process.stdout.write('$1'.split('.').reduce((p,c)=>p && p[c], require('${file}')))"
}
