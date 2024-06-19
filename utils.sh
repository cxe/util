#!/usr/bin/env bash

# @usage: `dir_containing [--stop=<dir>] <sub-path-to-find>`
# @params: 1) (sub-)filename to find, 2) starting-dir (defaults to PWD)
# @options: --stop=<dir> directory where to stop searching (default: <root>)
# @return: directory-path (where the (sub-)filename was found),
#          otherwise empty string (along with a non-zero errorcode)
# @throws: #400 if called without parameters, #404 if not found
# @alias:  upfind, find_upward
dir_containing() {
    local stop=""; [[ "$1" = --stop=* ]] && { stop="$( realpath "${1/--stop=/}" )"; shift; }
    [ "$1" ] || return 400
    local d="$( realpath "${2:-"$PWD"}" )"
    while [ "$d" ] && [ "$d" != "$stop" ] && [ ! -e "$d/$1" ]; do d="${d%/*}"; done
    [ -e "$d/$1" ] && echo "${d:-/}" || return 404
}

is_num(){
    export is_num="${1}"; shift
    local sign="?([+-])"
    local digit="[0123456789]" # [0-9] and [[:digit:]] can be locale-dependent
    local deci=".+($digit)"
    local frac="?($deci)"
    for type; do
        case "${type,,}" in
            int|integer) frac="";;
            uint) frac=""; sign="";;
            unsigned) sign="";;
            float|real|decimal) frac="$deci";;
            pos|positive) sign="?(+)";;
            neg|negative) sign="-";;
        esac
    done
    local match="$sign+($digit)${frac:+$frac|$sign$deci}"
    [[ "$is_num" == +($match) ]] || return 2
}

args(){
    declare -agx args=()
    declare -Agx opts=()
    local a v i

    for a; do
        shift
        v=1; [[ "$a" == -*=* ]] && { v="${a#*=}"; a="${a%=*}"; }
        case "$a" in
            --) args+=($@); break ;;
            --*) opts["${a:2}"]="$v" ;;
            -*) for ((i=${#a}, --i; i>0; --i)); do opts["${a:i:1}"]="$v"; v=1; done ;;
            *) args+=("$a");;
        esac
    done

    set -- ${args[@]}
}

catch(){
    errno=$?
    >&2 echo -en "\033[31m$(type -t ${FUNCNAME[1]}) '${FUNCNAME[1]}' failed with error-code #${errno}${error+": ${error//$'\n'/\\\\n} "}\033[2;31m. Trace:"
    for ((i=${#BASH_SOURCE[@]} - 1; i > 0; i-- )); do >&2 echo -n " ➛ ${FUNCNAME[$i]} (${BASH_SOURCE[$i]}:${BASH_LINENO[$i]})"; done
    >&2 echo -e "\033[0m"
}

# if not sourced and called with args
(return 0 2>/dev/null) || { [[ $# -gt 0 ]] && [ "$( type -t $1 )" == function ] && "$@" }
