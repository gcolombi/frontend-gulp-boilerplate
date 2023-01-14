/**
 * Gulp main functions
 * src() => Defines a file or a glob of files to execute task
 * dest() => Defines destination folder, end of the stream
 */
const { src, dest } = require("gulp");

/** 
 * Gulp plugins
 */
const sourcemaps = require('gulp-sourcemaps');
const plumber = require("gulp-plumber");
const gulpEsbuild = require('gulp-esbuild');
const buffer = require('vinyl-buffer');

/**
 * BrowserSync
 */
const { browserSync } = require('../browserSync');

/**
 * Environment
 */
const environment = require('../utils/gulp.environment');

/**
 * Transpiles the main app script
 * @param {boolean} isProd 
 */
function app(isProd) {
    return src(environment.paths.app.src)
    .pipe(gulpEsbuild({
        outfile: 'app.js',
        bundle: true,
        define: {
            // 'process.env.NODE_ENV': isProd
            'process.env.NODE_ENV': isProd ? "\"production\"" : "\"development\""
        }
    }))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(environment.paths.app.dest))
    .pipe(browserSync.stream());
}

function appDev(done) {
    // app("\"development\"");
    app(false);
    // app();
    
    done();
}

function appProd(done) {
    // app("\"production\"");
    app(true);
    // app('"production"');
    
    done();
}

/**
 * Transpiles all .js files in the modules folder and will output
 * a transpiled .js file for each module
 */
function modules() {
    return src(environment.paths.modules.src)
    .pipe(gulpEsbuild({
        bundle: true
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(environment.paths.modules.dest))
    .pipe(browserSync.stream());
}

module.exports = {
    app,
    appDev,
    appProd,
    modules
}