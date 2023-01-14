/**
 * Environment
 */
const environment = require('../utils/gulp.environment');

/**
 * Deletes files and directories using globs
 * https://github.com/sindresorhus/del
 */ 
const del = require('del');

/**
 * Empties the output directory
 */
function clean() {
    return del(`${environment.paths.dest}**/*`);
}

module.exports = clean;