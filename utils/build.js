/**
 * This is a build script.
 *
 * It automates some tedious tasks which have to be done before sending PR.
 *
 * Usage:
 *   Execute the following command in project root:
 *   npm run build
 */
const fs = require("fs");
const path = require("path");
const uglifyjs = require("uglify-js");

const targetDir = "bundle";

const uglifyOptions = {
    output: {
        // preserving only documentation headers
        comments: "some"
    }
};

const filesToBundle = [
    "jquery.hideseek-mod.js",
    "jquery.highlight.js",
    "hideseek.helpers.js",
];

// read file content
const filesContentToMinify = filesToBundle.reduce(
    (result, file) => {
        result[file] = fs.readFileSync(file, "utf8");
        return result;
    },
    {}
);

// create bundle
fs.writeFileSync(
    path.join(targetDir, "jquery.hideseek-mod.js"),
    Object.keys(filesContentToMinify).map(name => filesContentToMinify[name]).join("\r\n"),
    "utf8"
)

var minBundle = path.join(targetDir, "jquery.hideseek-mod.min.js");

// create minified bundle
fs.writeFileSync(
    minBundle,
    // uglify strips too many comments (only first one is preserved) when list of files is given as arg
    Object.keys(filesContentToMinify).map(name => uglifyjs.minify(filesContentToMinify[name], uglifyOptions).code).join("\r\n"),
    "utf8"
);

fs.createReadStream(minBundle).pipe(fs.createWriteStream(path.join("docs/javascripts/vendor", "jquery.hideseek-mod.min.js")));