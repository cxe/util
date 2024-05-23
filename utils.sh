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

