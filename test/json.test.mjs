#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";

const bash_json = args => bash(`./bin/json ${args}`);
const bash_json_var = v => bash(`. "$PWD/bin/json"; test -v ${v} && echo "\$${v}" || echo undefined`).output;

const VALID = ['null', 'true', 'false', 0, 42, Number.MAX_SAFE_INTEGER]; // todo: '""'  '{"foo":"bar"}','{}', ' { } ', '\n{\n}\n', '\t{\t}\t']
const INVALID = ['', ' ', '0o', 'TRUE', '...'];

describe("bash", () => {
  describe("json", () => {

    it('should expose global variables on import', () => {
        expect(bash_json_var("JSON_MIMETYPE")).toBe('application/json');
        expect(bash_json_var("JSON_CONFIG_COMMENTS")).toBe('');
        expect(bash_json_var("JSON_CONFIG_FILEEXT")).toContain('.json');
    });

    it('should not return an error code if valid', () => {
        for(const value of VALID) {
            expect(bash_json(value).errorCode).toBe(0);
        }
    });

    it('should return an error code if invalid', () => {
        for(const value of INVALID) {
            expect(bash_json(value).errorCode).not.toBe(0);
        }
    });

    it.todo('should ignore leading and trailing whitespace', () => {
        for(const value of VALID) {
            expect(bash_json(` ${value} `).errorCode).toBe(0);
        }
    });

    it('--type should print the passed value type', () => {
        for(const value of VALID) {
            expect(bash_json(`--type null`).output).toBe('null');
            expect(bash_json(`--type true`).output).toBe('boolean');
            expect(bash_json(`--type false`).output).toBe('boolean');
            expect(bash_json(`--type 0`).output).toBe('number');
            // todo expect(bash_json(`--type ""`).output).toBe('string');
        }
    });
  });
});
