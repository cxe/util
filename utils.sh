#!/usr/bin/env bash

[ "${UTILS_VERSION:-}" ] || {
    set -a
    UTILS_VERSION=0.1.3
    NODE_ENV="${NODE_ENV:=development}"
    readonly UTILS_VERSION NODE_ENV
    set +a

    source_fetch(){ local src="$1" url="$2"; if [ ! -s "$src" ]; then mkdir -p "${src%/*}" && curl -fksSL "$url" -o "$src" || return 1; fi; source "$src"; }


}
