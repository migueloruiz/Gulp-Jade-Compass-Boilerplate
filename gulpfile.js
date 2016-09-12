// Gulps Generales
// ====================================
var gulp       = require('gulp');
var plumber    = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload

// Compilacion y más
// ====================================
var compass = require('gulp-compass'); //Compilador SASS/SCSS
var jade = require('gulp-jade'); // Compilador Jade/Pug

// Gulps de Edicion
// ====================================
var insert      = require('gulp-insert');
var ext_replace = require('gulp-ext-replace');
var rename      = require("gulp-rename");
var concat      = require('gulp-concat');
var clean       = require('gulp-clean');

// Gulps Especiales
// ====================================
var csvtojson   = require('gulp-csvtojson');

// Gulps Plugins
// ====================================
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
    pattern: '*',
    scope: ['devDependencies'] // which keys in the config to look within
});

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

// CSV Converter Tasks
// ====================================
gulp.task('csvClean', getTask('csvClean'));
gulp.task('csvConcat', getTask('csvConcat'));
gulp.task('csvConvert', ['csvClean','csvConcat'], getTask('csvConvert'));

// SASS >> CSS con SASS(3.3.3) y Compass(1.0.1)
// ====================================
gulp.task('compass', getTask('compass'));
gulp.task('compassWatch', ['compass'] ,reload);

// Jade >> HTML
// ====================================
gulp.task('jade', getTask('jade'));
gulp.task('jadeWatch', ['jade'] ,reload);

// Start Code
// ====================================
gulp.task('compileProject', ['jade','compass'], function() {
    browserSync({server: './'});
    gulp.watch('./paralimpicos/**/*.jade', ['jadeWatch']);
    gulp.watch('./sass/*.sass', ['compassWatch']);
});
