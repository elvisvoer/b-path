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

    // [undefined, null, NaN, 42, BigInt(42), {}, [], Symbol(), false].forEach(
    //   (input) => {
    //     it(`path.isAbsolute should throw TypeError if input type is ${typeof input}`, () => {
    //       assert.throws(
    //         () => {
    //           bPath.isAbsolute(input);
    //         },
    //         {
    //           name: "TypeError",
    //           message: `The "path" argument must be of type string. Received ${typeof input}`,
    //         }
    //       );
    //     });
    //   }
    // );

    // input | expected result
    [
      [{}, ""],
      [{ root: "/root" }, "/root"],
      // only root is present so no separator is included
      [{ root: "/root", name: "file", ext: ".txt" }, "/rootfile.txt"],
      [{ root: "/root/", name: "file", ext: ".txt" }, "/root/file.txt"],
      // should add the extension "." if missing
      [{ root: "/root/", name: "file", ext: "txt" }, "/root/file.txt"],
      // should ignore 'name' and 'ext' if 'base' is present
      [
        { root: "/root/", base: "base.sh", name: "file", ext: ".txt" },
        "/root/base.sh",
      ],
      // should ignore 'root' if 'dir' is present
      [{ root: "/root/", dir: "/dir", base: "file.txt" }, "/dir/file.txt"],
      // additional tests
      [{ root: "" }, ""],
      [{ dir: "" }, ""],
      [{ dir: "." }, "./"],
      [{ dir: "/" }, "//"], // really?!
      [{ dir: "foo" }, "foo/"],
      [{ root: "/", dir: "/" }, "/"], // 'root' === 'dir' so no separator
      [{ root: ".", dir: "." }, "."], // same here
      [{ root: "/", dir: "./" }, ".//"], // results seem not to be normalized
      [{ root: "/", dir: "./", base: "../" }, ".//../"], // same here
      [{ ext: "txt" }, ".txt"], // dot is added even when only 'ext' is provided
      [{ ext: "." }, "."], // starts with dot so no changes
      [{ ext: ".." }, ".."], // same here
      [{ ext: "/" }, "./"], // makes no sense but respects the idea of adding a dot
    ].forEach(([input, result]) => {
      it(`path.format(${JSON.stringify(
        input
      )}) should return '${result}'`, () => {
        assert.strictEqual(bPath.format(input), result);
      });
    });
  });
});
