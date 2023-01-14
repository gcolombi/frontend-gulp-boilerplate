/**
 * Gulp main functions
 * src() => Defines a file or a glob of files to execute task
 * dest() => Defines destination folder, end of the stream
 */
const { src, dest } = require("gulp");

/** 
 * Gulp plugins
 */
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');

/**
 * Environment
 */
const environment = require('../utils/gulp.environment');

/**
 * Optimizes and copies all the images folder
 */
function images() {
    return src(environment.paths.images.src)
    .pipe(imagemin())
    .pipe(dest(environment.paths.images.dest));
}

/**
 * Creates webp images
 */
function imagesWebp() {
    return src(environment.paths.webp.src)
    .pipe(webp())
    .pipe(dest(environment.paths.webp.dest));
}

module.exports = {
    images,
    imagesWebp
}