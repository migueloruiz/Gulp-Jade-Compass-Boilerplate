// // ===== Gulp Includes ===============================================================================================================
//
// // Gulps Generales
// // ====================================
// const gulp			 = require('gulp');
// const plumber		= require('gulp-plumber');
// const browserSync = require('browser-sync');
// const gutil = require('gulp-util');
// const reload = browserSync.reload;
//
// // Compilacion y más
// // ====================================
// const sass = require('gulp-sass'); //Compilador SASS
// const pug = require('gulp-pug'); // Compilador Pug
//
//

// Gulps Generales
// ====================================
const gulp			 = require('gulp');
const plumber		= require('gulp-plumber');
const browserSync = require('browser-sync');
const gutil = require('gulp-util');
const beep = require('beepbeep')
const reload = browserSync.reload

// Compilacion y más
// ====================================
const sass = require('gulp-sass'); //Compilador SASS/SCSS
const pug = require('gulp-pug'); // Compilador Jade/Pug

// Edicion y Minificacion de Archivos
// ====================================
const uglify = require('gulp-uglify'); // Minificar
const concat = require('gulp-concat'); // Concatenar
const rename = require('gulp-rename'); // Renombrar
const changed = require('gulp-changed'); // Rectificaccion de cambio en arcvhivo destino
const changedInPlace = require('gulp-changed-in-place'); // Rectificaccion de cambio en arcvhivo origen
const header = require('gulp-header'); // Escritura de Header para TimeStamp

// Parametros
// ====================================
const SRC = './src';
const DIST = './dist';
// const JStoMIN = [
// 	'./js/scripts.js',
// 	'./js/lib.js',
// 	'./js/en-vivo.js',
// 	'./js/mapa-elecciones.js',
// 	'!js/*.min.js' // no minificar los archivos ya Minificados
// ];

// Error Handler
// ====================================
errorHandler = function(err) {
	console.log(err);
	console.log(err.message);
	beep(2);
	this.emit('end');
}

// SASS >> CSS
// ====================================
gulp.task('sass', function () {
  return gulp.src(SRC + '/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest( DIST + '/css'));
});

gulp.task('sass:watch', ['sass'] ,reload);

// Pug >> HTML
// ====================================
gulp.task('pug', function buildHTML() {
	return gulp.src(SRC + '/pug/*.pug')
				.pipe(plumber({
					errorHandler: (err)=> {
						console.log("<======= Pug Error ========>");
						console.log(err);
						console.log(err.message);
						beep(2);
						this.emit('end');
					}
				}))
				.pipe(pug({
					pretty: true
				}))
				.pipe(plumber.stop())
				.pipe(gulp.dest(function(file) {
						console.log("Write Pug");
						console.log(' '+file.path)
						//file.base
						return DIST;
				}))
});
gulp.task('pug:watch', ['pug'] ,reload);

// Js >>> min.Js
// ====================================
gulp.task('minJs', function minJS() {
	var date = new Date();
	var timeStamp = '/* Generado el :' + date + ' */\n\n';
	// .pipe(changedInPlace())
	return gulp.src( SRC + '/js/*.js' )
					.pipe(plumber({
						errorHandler: function (error) {
							console.log("<======= Uglify-js Error ========>");
							console.log(error.message);
							beep(2);
							this.emit('end');
					}}))
					.pipe(changed(SRC +'/js/', {extension: 'min.js'}))
					.pipe(rename({suffix: '.min'}))
					.pipe(uglify())
					.pipe(header(timeStamp))
					.pipe(plumber.stop())
					.pipe(gulp.dest(function(file) {
							gutil.log(gutil.colors.magenta('----') ,getFileName(file.history[0]),gutil.colors.cyan('▸'),getFileName(file.history[1]) );
							return DIST + '/js/';
					}))
});
gulp.task('js:watch', ['minJs'], reload);

// Browser-sync Init
// ====================================
gulp.task('browser-sync-init', function() {
		browserSync({
				server: './dist',
				browser: 'google chrome'
		});
});

// Custome Fuctions
// ======================================
var getFileName = function( url ) {
	var index = url.lastIndexOf("/") + 1;
	return filename = url.substr(index);
}

// Start Code
// ====================================
gulp.task('compileProject', ['browser-sync-init','pug','sass','minJs'], function() {
	gulp.watch([ SRC + '/pug/*.pug', SRC+'/pug/**/*.pug' ], ['pug:watch']);
	gulp.watch( SRC + '/sass/**/*.sass', ['sass:watch']);
	gulp.watch( SRC + '/js/*.js', ['js:watch']);
});

gulp.task('default',['compileProject'], function() {
	beep(1);
});
