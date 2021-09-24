function functionType(x) {
    return typeof x !== 'function'
        ? ''
        : x.hasOwnProperty('arguments')
            ? 'function'
            : x.prototype
                ? 'class'
                : 'arrow';
}
