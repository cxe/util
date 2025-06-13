#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";

const log_stderr = (args) => bash(`./bin/log ${args}`).errorText.replace(/\x1B\[[0-9;]*m/g, '');

describe("bash", () => {
  describe("log", () => {
    it('info', () => expect(log_stderr('foobar')).toBe('‣ foobar'));
    it('warn', () => expect(log_stderr('--warn foobar')).toBe('[WARN]‣ foobar'));
    it('error', () => expect(log_stderr('--error foobar')).toBe('[ERROR]‣ foobar'));
  });
});
