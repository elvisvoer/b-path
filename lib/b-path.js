// /**
//  * The assertIsString() function verifies whether the input is a string,
//  * throwing a TypeError otherwise.
//  * @param {*} input
//  * @throws {TypeError}
//  */
// function assertIsString(input) {
//   if (typeof input !== "string") {
//     throw new TypeError(
//       `The "path" argument must be of type string. Received ${typeof input}`
//     );
//   }
// }

// const posix = {
//   /**
//    * The isAbsolute() method determines if input path is an absolute path.
//    * @param {string} path - input path
//    * @returns {boolean}
//    */
//   isAbsolute: (path) => {
//     assertIsString(path);
//     return !!path && path.charCodeAt(0) === posix.sep.charCodeAt(0);
//   },

//   /**
//    * The path.format() method returns a path string from an object.
//    * This is the opposite of `path.parse()`.
//    * @param {object} pathObject
//    * @param {string} pathObject.root
//    * @param {string} pathObject.dir
//    * @param {string} pathObject.base
//    * @param {string} pathObject.name
//    * @param {string} pathObject.ext
//    * @returns {string}
//    */
//   format: (pathObject) => {
//     const result = [];

//     const root = pathObject.root || "";
//     let dir = pathObject.dir || "";
//     if (dir && dir.charCodeAt(dir.length - 1) !== posix.sep.charCodeAt(0)) {
//       dir = `${dir}${posix.sep}`;
//     }
//     const base = pathObject.base || "";
//     const name = pathObject.name || "";
//     let ext = pathObject.ext || "";
//     if (ext && ext.charCodeAt(0) !== ".".charCodeAt(0)) {
//       ext = `.${ext}`;
//     }

//     const dirName = dir || root;
//     const baseName = base || `${name}${ext}`;

//     if (dirName) result.push(dirName);
//     if (baseName) result.push(baseName);

//     return result.join("");
//   },

//   delimiter: ":",
//   sep: "/",
//   posix: null,
//   win32: null,
// };

// posix.posix = posix;

// export default posix;

import path from "node:path";
export default path;
