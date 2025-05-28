#!/usr/bin/env bash

# utils.sh v0.1.1 2025-05-28

source_fetch(){ local src="$1" url="$2"; if [ ! -s "$src" ]; then mkdir -p "${src%/*}" && curl -fksSL "$url" -o "$src" || return 1; fi; source "$src"; }
