#!/usr/bin/env sh
shopt -s extglob

readonly IS_SOURCED_PARAMS_SCRIPT="$( (return 0 2>/dev/null) && echo 1 )"

export readonly PARAM_PREFIX="${PARAM_PREFIX:-}"
export readonly SET_FLAGS=()
export readonly SET_OPTIONS=()
export readonly SET_ARGS=()

params_parse(){
    for param do
        # check for options (a double dash followed by a name - optionally followed by a value assignment denoted by an equals-sign)
        if [ ${param:0:2} = -- ]; then
            # a double-dash alone stops the parameter parsing (rest will be positional arguments)
            if [ $param = -- ]; then
                shift
                break
            fi
            value="${param:2}"
            if [[ $value = *=* ]]; then
                value=(${value//=/ })
                name="$( echo "${PARAM_PREFIX}${value[0]}" | tr a-z A-Z )"
                value="${value[1]}"
            else
                name="$( echo "${PARAM_PREFIX}${value}" | tr a-z A-Z )"
            fi
            SET_OPTIONS+=($name)
            set -o allexport; printf -v "$name" '%s' "$value"; set +o allexport
            shift

        # check for flags (a single dash followed by one or more case sensitive letters - each representing a flag)
        elif [ ${param:0:1} = - ]; then
            for (( i=1; i<${#param}; i++ )); do
                value="${param:$i:1}"
                name="${PARAM_PREFIX}${value}"
                # if a single letter flag is followed by a non-parameter interpret it as the value
                if [ ${#param} -eq 2 ] && [ "${2:0:1}" != - ]; then
                    value="$2"
                    shift
                fi
                set -o allexport; printf -v "$name" '%s' "$value"; set +o allexport
                if [[ " ${SET_FLAGS[*]} " =~ " ${name} " ]]; then
                    :
                    # todo turn into array
                    #str="`declare -p SET_FLAGS 2>/dev/null`";
                    #[[ "${str:0:10}" == 'declare -a' ]] &&  echo array || echo scalar
                else
                    SET_FLAGS+=("$name")
                fi
            done
            shift
        fi
    done
    SET_ARGS=($@)
    IFS=$'\n' SET_FLAGS=($(sort <<<"${SET_FLAGS[*]}"))
    unset IFS
}

params_print() {
    local BLACK=("\033[0m" "\033[1;30m")
    local RED=("\033[0;31m" "\033[1;31m")
    local GREEN=("\033[0;32m" "\033[1;32m")
    local YELLOW=("\033[0;33m" "\033[1;33m")
    local BLUE=("\033[0;34m" "\033[1;34m")
    local PINK=("\033[0;35m" "\033[1;35m")
    local AQUA=("\033[0;36m" "\033[1;36m")
    local GREY=("\033[0;37m" "\033[1;37m")

    echo -e "${BLUE[1]}Options (${#SET_OPTIONS[@]})${GREY}"
    for name in "${SET_OPTIONS[@]}"; do echo -e " $name: \"${!name}\""; done
    echo -e "${BLUE[1]}Flags (${#SET_FLAGS[@]})${GREY}"
    for name in "${SET_FLAGS[@]}"; do echo -e " $name: \"${!name}\""; done
    echo -e "${BLUE[1]}Arguments (${#SET_ARGS[@]})${GREY}"
    for (( i=0; i<${#SET_ARGS[@]}; i++ )); do echo -e " [$(( $i ))]: \"${AQUA}${SET_ARGS[$i]}${GREY}\""; done
    echo -e $BLACK
}
