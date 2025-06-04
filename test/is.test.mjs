#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";

const bash_is = (args) => () => expect(bash(`./bin/is ${args}`).errorCode).toBe(0);
const bash_is_not = (args) => () => expect(bash(`./bin/is ${args}`).errorCode).not.toBe(0);

describe("is", () => {
  describe("shell", () => {
    describe('bool', ()=>{
        it('bool', bash_is('bool true'));
        it('truthy', bash_is('truthy foobar'));
        it('falsy', bash_is('falsy 0'));
    });
    describe('number', ()=>{
        it('zero', bash_is('number 0'));
        it('uint', bash_is('number 42'));
        it('negint', bash_is('number -5'));
        it('dec', bash_is('number 1.23'));
        it('ndec', bash_is('number -4.0'));
    });
    describe('function', ()=>{
        it('should be detected', bash_is('function is'));
        it('should not detect non-functions', bash_is_not('function NOT_A_THING'));
    });
    describe('variable', ()=>{
        it('should be detected', bash_is('variable PATH'));
        it('should not detect non-functions', bash_is_not('variable NOT_A_THING'));
    });
  });
});
