#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";

const bash_json = args => bash(`./bin/json ${args}`);
const bash_json_var = v => bash(`. "$PWD/bin/json"; test -v ${v} && echo "\$${v}" || echo undefined`).output;

describe("bash", () => {
  describe("json", () => {

    it('should expose global variables', () => {
        expect(bash_json_var("JSON_MIMETYPE")).toBe('application/json');
        expect(bash_json_var("JSON_CONFIG_COMMENTS")).toBe('');
        expect(bash_json_var("JSON_CONFIG_FILEEXT")).toContain('.json');
    });

    it('should not return an error code if valid', () => {
        for(const value of ['null', 'true', 'false']) { // todo: ['{"foo":"bar"}','{}', ' { } ', '\n{\n}\n', '\t{\t}\t']
            expect(bash_json(value).errorCode).toBe(0);
        }
    });

    it('should return an error code if invalid', () => {
        for(const value of ['', 'TRUE', '...']) {
            expect(bash_json(value).errorCode).not.toBe(0);
        }
    });

  });
});
