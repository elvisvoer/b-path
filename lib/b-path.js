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

/**
 * The isObject() method determines if input is an object.
 * @param {*} input
 * @returns {boolean}
 */
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input) && input !== null;
}

/**
 * The assertIsObject() function verifies whether the input is an object,
 * throwing a TypeError otherwise.
 * @param {*} input
 * @throws {TypeError}
 */
function assertIsObject(input) {
  if (!isObject(input)) {
    throw new TypeError(
      `The "pathObject" argument must be of type object. Received ${typeof input}`
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

  /**
   * The path.format() method returns a path string from an object.
   * This is the opposite of `path.parse()`.
   * @param {object} pathObject
   * @param {string} pathObject.root
   * @param {string} pathObject.dir
   * @param {string} pathObject.base
   * @param {string} pathObject.name
   * @param {string} pathObject.ext
   * @returns {string}
   */
  format: (pathObject) => {
    assertIsObject(pathObject);
    const result = [];

    const root = pathObject.root || "";
    let dir = pathObject.dir || "";
    if (dir && dir !== root) {
      dir = `${dir}${posix.sep}`;
    }
    const base = pathObject.base || "";
    const name = pathObject.name || "";
    let ext = pathObject.ext || "";
    if (ext && ext.charCodeAt(0) !== ".".charCodeAt(0)) {
      ext = `.${ext}`;
    }

    const dirName = dir || root;
    const baseName = base || `${name}${ext}`;

    if (dirName) result.push(dirName);
    if (baseName) result.push(baseName);

    return result.join("");
  },

  /**
   * Normalize a string path, reducing '..' and '.' parts.
   * When multiple slashes are found, they're replaced by a single one;
   * when the path contains a trailing slash, it is preserved.
   *
   * @param path string path to normalize.
   * @throws {TypeError} if `path` is not a string.
   */
  normalize: (path) => {
    assertIsString(path);

    if (path.length === 0) {
      return ".";
    }

    if (path.length === 1) {
      return path;
    }

    const hasTrailingSep = path.charAt(path.length - 1) === posix.sep;
    const absolute = posix.isAbsolute(path);
    const fragments = [];
    let word = "";
    let dots = 0;

    const handleFragment = () => {
      if (dots > 2) {
        fragments.push(Array(dots).fill(".").join(""));
      }

      if (dots === 2) {
        if (fragments.length && fragments[fragments.length - 1] !== "..") {
          // navigate up but don't pop an existing ".."
          fragments.pop();
        } else if (!absolute) {
          // top reached and relative path,
          // absolute path is handled in the if (fragments.length === 0) below
          fragments.push("..");
        }
      }

      if (word.length) {
        fragments.push(word);
      }
    };

    for (let i = 0; i < path.length; i += 1) {
      // duplicated sep, skip
      if (
        path.charAt(i) === posix.sep &&
        i - 1 >= 0 &&
        path.charAt(i - 1) === posix.sep
      ) {
        continue;
      }

      if (path.charAt(i) === ".") {
        dots += 1;
        continue;
      }

      if (path.charAt(i) === posix.sep) {
        handleFragment();

        word = "";
        dots = 0;
        continue;
      }

      word += path.charAt(i);
    }

    handleFragment();

    if (fragments.length === 0) {
      if (absolute) {
        return posix.sep;
      }

      return hasTrailingSep ? "./" : ".";
    }

    let result = fragments.join(posix.sep);
    if (hasTrailingSep) {
      result += posix.sep;
    }

    return result;
  },

  delimiter: ":",
  sep: "/",
  posix: null,
  win32: null,
};

posix.posix = posix;

export default posix;
