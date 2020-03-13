//usr/bin/env docker run -it -v "$PWD":"$PWD" -w "$PWD" node:latest ${1:-node "$PWD/${0#./}"} && exit

console.log(process.env, process.versions);
