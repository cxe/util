#!/usr/bin/env bash -c "npx jest --silent --runInBand $0 $@; exit $?"
import { bash } from "../bash.mjs";


describe("is", () => {
  describe("shell", () => {
    it('bool', () => bash('set -x; ./bin/is bool true').errorCode).toBe(0);
  });
});
