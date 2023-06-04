#!/usr/bin/env sh

__DIRNAME="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

stderrRed(){
  exec 3>&2; exec 2> >(sed -u 's/^\(.*\)$/'$'\e''[31m\1'$'\e''[m/' >&3)
}

echorun(){
  cmd="$1"
  args="${@:2}"
  >&2 echo -e "\033[1;36m${cmd}\033[0;36m ${args}\033[0m"
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

parseArgs(){
      # extract options and flags
      for arg in $@ ; do
         if [[ "$arg" = -* ]]; then
            if [ "$arg" == -- ]; then
               shift; break;
            elif [[ "$arg" = --* ]]; then
               arg="${arg:2}"
               [[ "$arg" = *=* ]] && {
                  varname="option_${arg%=*}"
                  declare $varname="${arg#*=}"
               } || {
                  varname="option_${arg}"
                  declare $varname="1"
               }
            else
               arg="${arg:1}"
               for (( i=0; i<${#arg}; i++ )); do
                  varname="flag_${arg:$i:1}"
                  declare $varname="1"
               done
            fi
            shift
         else
            break
         fi
      done
}
