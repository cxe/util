function isFunction(x) {
    return typeof x !== 'function'
        ? ''
        : x.hasOwnProperty('arguments')
            ? 'function'
            : x.prototype
                ? 'class'
                : 'arrow';
}
