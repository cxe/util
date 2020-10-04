const freezeDeep = o => {
  if (o && (typeof o === 'function' || typeof o === 'object') && !Object.isFrozen(o)) Object.freeze(o).map(prop => freezeDeep(prop));
  return o;
};
