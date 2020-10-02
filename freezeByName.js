
/**
 * @use `freezeByName.call(myObj, 'read', 'only')`
 */
const freezeByName = (...propNames) => {
    if (!this) return; 
    const configurable = false, writable = false, descr = {};
    for (const name of propNames)
      if (typeof this[name] !== 'undefined')
        descr[name] = (descr[name].value !== 'undefined') ? { configurable, writable } : { configurable };
    Object.defineProperties(this, descr);
};
