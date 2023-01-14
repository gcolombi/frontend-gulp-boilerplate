/**
 * Gulp main functions
 * src() => Defines a file or a glob of files to execute task
 * dest() => Defines destination folder, end of the stream
 */
const { src, dest } = require("gulp");

/**
 * Environment
 */
const environment = require('../utils/gulp.environment');

/**
 * Copies all html templates
 */
function html() {
    return src(environment.paths.html.src)
    .pipe(dest(environment.paths.html.dest));
}

module.exports = html;