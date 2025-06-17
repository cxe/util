#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";

const bash_json = args => bash(`./bin/json ${args}`);
const bash_json_var = v => bash(`. "$PWD/bin/json"; test -v ${v} && echo "\$${v}" || echo undefined`).output.trim();

describe("bash", () => {
  describe("json", () => {
    it('should expose global variables', () => {
        expect(bash_json_var("JSON_MIMETYPE")).toBe('application/json');
        expect(bash_json_var("JSON_CONFIG_COMMENTS")).toBe('');
        expect(bash_json_var("JSON_CONFIG_FILEEXT")).toContain('.json');
    });
    it.todo('should not return an error code if valid', () => {
        expect(bash_json('{"foo":"bar"}').errorCode).toBe(0);
    });
    it.todo('should return an error code if invalid', () => {
        expect(bash_json('{"foo":bar"}').errorCode).not.toBe(0);
    });
  });
});
