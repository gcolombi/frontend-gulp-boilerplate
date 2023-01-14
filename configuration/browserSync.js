/**
 * Browsersync
 */
const browserSync = require('browser-sync').create();

/**
 * Environment
 */
const environment = require('./utils/gulp.environment');

/**
 * Creates a localserver
 */
function serve(done) {
    browserSync.init({
        ...environment.browserSync
    });
    
    done();
}

/**
 * informs browser to reloads the page
 */
function reload(done) {
    browserSync.reload();

    done();
}

module.exports = {
    browserSync,
    serve,
    reload
}