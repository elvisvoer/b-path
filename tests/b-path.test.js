import { describe, it } from "node:test";
import assert from "node:assert/strict";
import bPath from "../lib/b-path.js";

describe("b-path", () => {
  describe("POSIX", () => {
    it("path.delimiter should provide the path delimiter", () => {
      assert.strictEqual(bPath.delimiter, ":");
    });

    it("path.sep should provide the path separator", () => {
      assert.strictEqual(bPath.sep, "/");
    });

    // input | expected result
    [
      ["", false],
      [".", false],
      ["foo/", false],
      ["foo.bar", false],
      ["/foo/bar", true],
      ["/baz/..", true],
    ].forEach(([input, result]) => {
      it(`path.isAbsolute("${input}") should return '${result}'`, () => {
        assert.strictEqual(bPath.isAbsolute(input), result);
      });
    });
  });
});
