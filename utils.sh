#!/usr/bin/env bash

[ "${UTILS_VERSION:-}" ] || {
    set -a
    UTILS_VERSION=0.1.3
    NODE_ENV="${NODE_ENV:=development}"
    readonly UTILS_VERSION NODE_ENV
    set +a

    source_fetch(){ local src="$1" url="$2"; if [ ! -s "$src" ]; then mkdir -p "${src%/*}" && curl -fksSL "$url" -o "$src" || return 1; fi; source "$src"; }
    isNot() { local err=1; [[ -z "$1" || "${1,,}" == @(false|no|none|null|undefined|off|0) ]] && err=0; return $err; }
    isTrue() { ! isNot "$1"; }
    isOnline(){ (echo > /dev/tcp/8.8.8.8/53) 2>/dev/null; }
    isCommand() { command -v "$1" >/dev/null 2>&1; }

    isCommand uuidgen || uuidgen(){ od -x /dev/urandom | head -1 | awk '{OFS="-"; print $2$3,$4,$5,$6,$7$8$9}'; }
}
