/**
 * Gulp main functions
 * series() => Executes task in series, will fail if any of the task fails
 * parallel() => Executes all the tasks in parallel. Will not fail if a task errors. Much faster
 * src() => Defines a file or a glob of files to execute task
 * dest() => Defines destination folder, end of the stream
 * watch() => Watches files defined by path, glob, array ... then execute task and callback
 */
const { series, parallel, src, dest, watch } = require("gulp");

/**
 * Deletes files and directories using globs
 * https://github.com/sindresorhus/del
 */ 
const del = require('del');

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
 * Browsersync
 */
const browserSync = require('browser-sync').create();


/**
 * Paths
 */
const paths = {
    html: {
        src: 'src/templates/*.html',
        dest: 'dist/',
        watch: 'src/templates/**/*.html'
    },
    scss: {
        src: ['src/assets/styles/style.scss', 'src/assets/styles/components/**/*.scss'],
        dest: 'dist/assets',
        watch: 'src/assets/styles/**/*.scss'
    },
    app: {
        src: 'src/assets/scripts/app.js',
        dest: 'dist/assets',
        watch: ['src/assets/scripts/**/*.js', '!src/assets/scripts/modules/**']
    },
    modules: {
        src: 'src/assets/scripts/modules/**.js',
        dest: 'dist/assets',
        watch: 'src/assets/scripts/modules/**/*.js'
    },
    images: {
        src: 'src/assets/images/**/*',
        dest: 'dist/assets/images'
    },
    fonts: {
        src: 'src/assets/fonts/**/*',
        dest: 'dist/assets/fonts'
    },
    webp: {
        src: ['src/assets/images/**/*', '!src/assets/images/favicons/**', '!src/assets/images/svg/**'],
        dest: 'dist/assets/images/webp'
    }
};

// const outputDir = './dist/assets/';



/**
 * Tasks
 * Each function must either return the gulp stream or execute a callback function e.g. done() or cb()
 */

/**
 * Empties the output directory
 */
function clean() {
    return del('dist/**/*');
}


/**
 * Compiles style.scss and all .scss files in the components folder
 * each file will be outputed as a css file
 */
function styles() {
    // return src(['src/assets/styles/style.scss', 'src/assets/styles/components/**/*.scss'])
    return src(paths.scss.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(autoprefixer({
        cascade: false,
        flexbox: false
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('/'))
    // .pipe(dest(outputDir))
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// function app() {
//     return src('src/assets/scripts/app.js')
//     .pipe(gulpEsbuild({
//         outfile: 'app.js',
//         bundle: true,
//     }))
//     .pipe(plumber())
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(sourcemaps.write('/'))
//     .pipe(dest(outputDir))
//     .pipe(browserSync.stream());
// }

/**
 * Transpiles the main app script
 * @param {boolean} isProd 
 */
function app(isProd) {
    // return src('src/assets/scripts/app.js')
    return src(paths.app.src)
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
    // .pipe(dest(outputDir))
    .pipe(dest(paths.app.dest))
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
    //get every js file
    // return src(['src/assets/scripts/modules/**.js'])
    return src(paths.modules.src)
    .pipe(gulpEsbuild({
        bundle: true
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('/'))
    // .pipe(dest(outputDir))
    .pipe(dest(paths.modules.dest))
    .pipe(browserSync.stream());
}

/**
 * Minifies all .js files
 */
function minifyJS() {
    // get every js file in /dist then uglify them
    return src('dist/**/*.js')
    .pipe(buffer())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(dest('./dist'));
}

/**
 * Minifies all .css files
 */
function minifyCSS() {
    return src('dist/**/*.css')
    .pipe(buffer())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cleanCSS())
    .pipe(dest('./dist'));
}

/**
 * Copies all html templates
 */
function html() {
    // return src('src/templates/*.html')
    // .pipe(dest('dist/'));
    return src(paths.html.src)
    .pipe(dest(paths.html.dest));
}

/**
 * Optimizes and copies all the images folder
 */
function images() {
    // return src('src/assets/images/**/*')
    return src(paths.images.src)
    .pipe(imagemin())
    // .pipe(dest(`${outputDir}images`));
    .pipe(dest(paths.images.dest));
}

/**
 * Copies all the fonts folder
 */
function fonts() {
    // return src('src/assets/fonts/**/*')
    return src(paths.fonts.src)
    // .pipe(dest(`${outputDir}fonts`));
    .pipe(dest(paths.fonts.dest));
}

/**
 * Creates webp images
 */
function images_webp() {
    // return src(['src/assets/images/**/*', '!src/assets/images/favicons/**', '!src/assets/images/svg/**'])
    return src(paths.webp.src)
    .pipe(webp())
    // .pipe(dest(`${outputDir}images/webp`));
    .pipe(dest(paths.webp.dest));
}

/**
 * Creates a localserver
 */
function serve(done) {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html'
        },
        port: 8000,
        open: false
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

/**
 * Watches filechanges and reloads the page
 */
function watchfiles(done) {

    /* executes html task */
    // watch('src/templates/**/*.html', series(html, reload));
    watch(paths.html.watch, series(html, reload));

    /* executes scss task */
    // watch(['src/assets/styles/**/*.scss'], series(styles, reload));
    watch(paths.scss.watch, series(styles, reload));

    /* executes js task */
    // watch(['src/assets/scripts/**/*.js', '!src/assets/scripts/modules/**'], series(app, reload));
    // watch(['src/assets/scripts/**/*.js', '!src/assets/scripts/modules/**'], series(appDev, reload));
    watch(paths.app.watch, series(appDev, reload));
    // watch(['src/assets/scripts/modules/**/*.js'], series(modules, reload));
    watch(paths.modules.watch, series(modules, reload));

    done();
}

/**
 * Exports basic tasks
 */
exports.clean = clean;
exports.webp = images_webp;
exports.images = images;
exports.fonts = fonts;
exports.html = html;
exports.styles = styles;
exports.app = app;
exports.appDev = appDev;
exports.appProd = appProd;
exports.modules = modules;

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