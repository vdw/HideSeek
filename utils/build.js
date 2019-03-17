const fs = require("fs");
const uglifyjs = require("uglify-js");

const uglifyOptions = {
    output: {
        comments: "some"
    }
};

fs.writeFileSync("part1.js", uglifyjs.minify({
    "jquery.hideseek-mod.js": fs.readFileSync("jquery.hideseek-mod.js", "utf8")
}, uglifyOptions).code, "utf8");