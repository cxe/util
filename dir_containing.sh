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

(return 0 2>/dev/null) || dir_containing $@
