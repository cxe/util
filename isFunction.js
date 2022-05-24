function isFunction(x) {
    return typeof x === 'function'
        ? x.prototype
            ? Object.getOwnPropertyDescriptor(x, 'prototype').writable
                ? 'function'
                : 'class'
        : x.constructor.name === 'AsyncFunction'
        ? 'async'
        : 'arrow'
    : '';
}
