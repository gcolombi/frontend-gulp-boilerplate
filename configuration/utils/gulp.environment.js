/**
 * Environment
 */
module.exports = {
    paths: {
        dest: 'dist/',
        html: {
            src: 'src/templates/*.html',
            dest: 'dist/',
            watch: 'src/templates/**/*.html'
        },
        styles: {
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
    },
    browserSync: {
        server: {
            baseDir: 'dist/',
            index: 'index.html'
        },
        port: 8000,
        open: false
    }
};