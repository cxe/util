#!/usr/bin/env sh

__DIRNAME="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

echorun(){
  cmd="$1"
  args="${@:2}"
  echo -e "\033[1;36m${cmd}\033[0;36m ${args}\033[0m"
  [ -z $DRY ] && $cmd $args
}

# @usage FOO="$(findUpwardFile foo.txt)"
readUpwardFile() {
    echo "$(f=/$1; d="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"; while [ "$d" != "/" ]; do [ -f "$d$f" ] && echo "$d$f"; d="$(dirname "$d")"; done)"
}

# @usage package_json version
package_json() {
    local file="$(readUpwardFile package.json)"
    node -e "process.stdout.write('$1'.split('.').reduce((p,c)=>p && p[c], require('${file}')))"
}
