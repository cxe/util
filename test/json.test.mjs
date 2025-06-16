#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";

const bash_json = args => bash(`./bin/json ${args}`);

describe("bash", () => {
  describe("json", () => {
    it('should expose global variables', () => {
        const { output, errorText } = bash('. "$PWD/bin/json"; echo $JSON_MIMETYPE;');
        expect(output).toBe('application/json');
        expect(errorText).toBe('');
    });
    it.todo('should not return an error code if valid', () => {
        expect(bash_json('{"foo":"bar"}').errorCode).toBe(0);
    });
    it.todo('should return an error code if invalid', () => {
        expect(bash_json('{"foo":bar"}').errorCode).not.toBe(0);
    });
  });
});
