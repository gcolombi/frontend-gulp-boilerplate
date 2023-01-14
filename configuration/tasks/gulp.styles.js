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
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

/**
 * BrowserSync
 */
const { browserSync } = require('../browserSync');


/**
 * Environment
 */
const environment = require('../utils/gulp.environment');

/**
 * Compiles style.scss and all .scss files in the components folder
 * each file will be outputed as a css file
 */
function styles() {
    return src(environment.paths.styles.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(autoprefixer({
        cascade: false,
        flexbox: false
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(environment.paths.styles.dest))
    .pipe(browserSync.stream());
}

module.exports = styles;