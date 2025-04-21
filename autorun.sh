#!/usr/bin/env bash

declare -A autorun=(
    [nvm]=1
)

[ -s "~/.autorun" ] && source "~/.autorun"

[ "${autorun[nvm]}" ] && {
    # Load nvm if it's not already loaded
    if ! command -v nvm &> /dev/null; then
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    fi

    cd() {
        local status=0
        builtin cd "$@" && status=$?

        if [[ -f .nvmrc ]]; then
            local node_version=$(<.nvmrc)
            nvm use "$node_version" > /dev/null || {
                nvm install "$node_version"
                nvm use "$node_version"
            }
        fi

        return $status
    }
}
