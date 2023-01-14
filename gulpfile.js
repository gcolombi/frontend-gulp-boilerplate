/**
 * Gulp main functions
 * series() => Executes task in series, will fail if any of the task fails
 * parallel() => Executes all the tasks in parallel. Will not fail if a task errors. Much faster
 * watch() => Watches files defined by path, glob, array ... then execute task and callback
 */
const { series, parallel, src, dest, watch } = require("gulp");

/** 
 * Gulp plugins
 */
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const plumber = require("gulp-plumber");
const autoprefixer = require('gulp-autoprefixer');
const gulpEsbuild = require('gulp-esbuild');
const buffer = require('vinyl-buffer');

/**
 * Tasks
 * Each function must either return the gulp stream or execute a callback function e.g. done() or cb()
 */
const styles = require('./configuration/tasks/gulp.styles');
const { app, appDev, appProd, modules } = require('./configuration/tasks/gulp.scripts');
const html = require("./configuration/tasks/gulp.html");
const { images, images_webp } = require('./configuration/tasks/gulp.images');
const fonts = require('./configuration/tasks/gulp.fonts');

/**
 * Browsersync
 */
const { serve, reload } = require('./configuration/browserSync');

/**
 * Utils
 */
const clean = require('./configuration/utils/gulp.tools');
const environment = require('./configuration/utils/gulp.environment');

/**
 * Minifies all .js files
 */
function minifyJS() {
    // get every js file in /dist then uglify them
    return src(`${environment.paths.dest}**/*.js`)
    .pipe(buffer())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(dest(environment.paths.dest));
}

/**
 * Minifies all .css files
 */
function minifyCSS() {
    return src(`${environment.paths.dest}**/*.css`)
    .pipe(buffer())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cleanCSS())
    .pipe(dest(environment.paths.dest));
}

/**
 * Watches filechanges and reloads the page
 */
function watchfiles(done) {

    /* executes html task */
    // watch('src/templates/**/*.html', series(html, reload));
    watch(environment.paths.html.watch, series(html, reload));

    /* executes scss task */
    // watch(['src/assets/styles/**/*.scss'], series(styles, reload));
    watch(environment.paths.styles.watch, series(styles, reload));

    /* executes js task */
    // watch(['src/assets/scripts/**/*.js', '!src/assets/scripts/modules/**'], series(app, reload));
    // watch(['src/assets/scripts/**/*.js', '!src/assets/scripts/modules/**'], series(appDev, reload));
    watch(environment.paths.app.watch, series(appDev, reload));
    // watch(['src/assets/scripts/modules/**/*.js'], series(modules, reload));
    watch(environment.paths.modules.watch, series(modules, reload));

    done();
}

/**
 * Exports main tasks
 */
exports.default = series(clean, parallel( html, styles, app, modules, images, images_webp, fonts));
exports.build = series(clean, parallel( html, styles, app, modules, images, images_webp, fonts));
exports.serve = series(series( clean, parallel( html, styles, appDev, modules, images, images_webp, fonts)), serve, watchfiles);
// exports.serve = series(series(clean, parallel( html, styles, appProd, modules, images, images_webp, fonts)), parallel(minifyCSS, minifyJS), serve, watchfiles);
// exports.serve = series(series(clean, parallel( html, styles, app, modules, images, images_webp, fonts)), parallel(minifyCSS, minifyJS), serve);
// exports.watch = series(series(clean, parallel(html, styles, appDev, modules, images, images_webp, fonts)), watchfiles);
exports.watch = series(series(clean, parallel(html, styles, appDev, modules, images, images_webp, fonts)), watchfiles);
exports.production = series(series(clean, parallel( html, styles, appProd, modules, images, images_webp, fonts)), parallel(minifyCSS, minifyJS));