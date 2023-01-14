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
 * Copies all the fonts folder
 */
function fonts() {
    return src(environment.paths.fonts.src)
    .pipe(dest(environment.paths.fonts.dest));
}

module.exports = fonts;