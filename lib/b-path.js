/**
 * The assertIsString() function verifies whether the input is a string,
 * throwing a TypeError otherwise.
 * @param {*} input
 * @throws {TypeError}
 */
function assertIsString(input) {
  if (typeof input !== "string") {
    throw new TypeError(
      `The "path" argument must be of type string. Received ${typeof input}`
    );
  }
}

const posix = {
  /**
   * The isAbsolute() method determines if input path is an absolute path.
   * @param {string} path - input path
   * @returns {boolean}
   */
  isAbsolute: (path) => {
    assertIsString(path);
    return !!path && path.charCodeAt(0) === posix.sep.charCodeAt(0);
  },

  delimiter: ":",
  sep: "/",
  posix: null,
  win32: null,
};

posix.posix = posix;

export default posix;
