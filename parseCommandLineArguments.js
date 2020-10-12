const parseCommandArguments = (args) => {
  const arg = [];
  let i = -1;
  for (let i = 0, n = args.length; i < n; ++i) {
    let [name, value] = args[i].split('=');
    if (name[0] === '-') {
      if (value === undefined) value = (i < n - 1 && args[i + 1][0] !== '-') ? args[++i] : true;
      if (name[1] === '-') {
        arg[name.substring(2)] = value;
      } else {
        for (const flag of name.substring(1).split('')) arg[flag] = value;
      }
    } else if (value === undefined) {
      arg.push(name);
    } else {
      arg[name] = value;
    }
  }
  return arg;
};
