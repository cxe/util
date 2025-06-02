#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";

const bash_is = (args) => () => expect(bash(`./bin/is ${args}`).errorCode).toBe(0);

describe("is", () => {
  describe("shell", () => {
    it('bool', bash_is('bool true'));
    it('truthy', bash_is('truthy foobar'));
    it('falsy', bash_is('falsy 0'));
  });
});
