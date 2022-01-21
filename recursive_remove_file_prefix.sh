recursive_remove_file_prefix() {
    local endOfPrefixDelimiter="${1:-_}"
    for dir in ./*/; do
        dir=${dir%*/}
        cd "${dir##*/}"
        for file in * ; do
            # echo "${dir##*/}/$file => ${dir##*/}/${file#*${endOfPrefixDelimiter}}"
            mv -v "$file" "${file#*${endOfPrefixDelimiter}}"
        done
        cd ..
    done
}
