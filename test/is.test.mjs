#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";

const bash_is = (args) => () => expect(bash(`./bin/is ${args}`).errorCode).toBe(0);
const bash_fails = (args) => () => expect(bash(`./bin/is ${args}`).errorCode).not.toBe(0);

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
    describe('integer', ()=>{
        it('zero', bash_is('integer 0'));
        it('positive', bash_is('integer 42'));
        it('negative', bash_is('integer -5'));
        it('not float', bash_fails('integer 1.23'));
    });
    describe('function', ()=>{
        it('should be detected', bash_is('function is'));
        it('fails non-functions', bash_fails('function NOT_A_THING'));
    });
    describe('variable', ()=>{
        it('should be detected', bash_is('variable PATH'));
        it('fails non-vars', bash_fails('variable NOT_A_THING'));
    });
    describe('file', ()=>{
        it('should be detected', bash_is('file ./README.md'));
        it('fails non-files', bash_fails('file NOT_A_THING'));
    });
  });
});
