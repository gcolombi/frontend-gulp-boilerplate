/**
 * Environment
 */
// const path = require('path');

module.exports = {
    // paths: {
    //     /* Path to source files directory */
    //     source: path.resolve(__dirname, '../src/'),

    //     /* Path to built files directory */
    //     output: path.resolve(__dirname, '../dist/'),
    // },
    browserSync: {
        server: {
            baseDir: './dist',
            index: 'index.html'
        },
        port: 8000,
        open: false
    }
};