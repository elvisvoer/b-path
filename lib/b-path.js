const posix = {
  /**
   * The isAbsolute() method determines if input path is an absolute path.
   * @param {string} path - input path
   * @returns {boolean}
   */
  isAbsolute: (path) => {
    return !!path && path.charCodeAt(0) === posix.sep.charCodeAt(0);
  },

  delimiter: ":",
  sep: "/",
  posix: null,
  win32: null,
};

posix.posix = posix;

export default posix;
