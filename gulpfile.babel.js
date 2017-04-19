'use strict'
// ===== Gulp Includes ===============================================

// Gulps Generales
// ====================================
const gulp = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const PORT = 3000

// Utilidades
// ====================================
const plumber = require('gulp-plumber')
const gutil = require('gulp-util')
const beep = require('beepbeep')
const eslint = require('gulp-eslint')

// Processors
// ====================================
const pug = require('gulp-pug') // Prosesador Jade/Pug
const browserify = require('browserify') // Prosesador Common Js
// const babelify = require('babelify') // Prosesador ES2015
const buffer = require('vinyl-buffer') // Buffer Bable
const source = require('vinyl-source-stream')
const sass = require('gulp-sass') // Prosesador SASS
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')

// Edicion y Minificacion de Archivos
// ====================================
const sourcemaps = require('gulp-sourcemaps') // Generacion de SorceMaps
const uglify = require('gulp-uglify') // Minificar
// const rename = require('gulp-rename') // Renombrar
const header = require('gulp-header') // Escritura de Header para TimeStamp
const changed = require('gulp-changed') // Rectificaccion de cambio en arcvhivo destino
const del = require('del') // Eliminacion de Carpetas

// Parametros
// ====================================

const SRC = './src'
const DEST = './dist'

const DEST_JS_CSS = 'recursos_estaticos'

const mainJsFileIn = `bundle.js`
const mainJsSrc = `${SRC}/js/${mainJsFileIn}`
const mainJsDist = `${DEST}/${DEST_JS_CSS}/js/`

const mainCssDist = `${DEST}/${DEST_JS_CSS}/css/`

const mainJsonDist = `${DEST}/${DEST_JS_CSS}/json/`

const mainAssetsDist = `${DEST}/${DEST_JS_CSS}/assets/`

const PUG_FILES = [
  `${SRC}/pug/**/*.pug`,
  `!${SRC}/pug/_includes/*.pug`
]

const jsToLint = [
  `${SRC}/js/**/*.js`,
  `./gulpfile.bable.js`,
  `./test/*.js`
]

// ===== Pug >> HTML ================================================
gulp.task('pug', function buildHTML () {
  return gulp.src(PUG_FILES)
        .pipe(plumber({
          errorHandler: function (error) {
            beep(2)
            gutil.log(gutil.colors.red('<======= Pug Error ========>'))
            gutil.log(error.message)
            this.emit('end')
          }
        }))
        .pipe(changed(DEST, {
          extension: '.html'
        }))
        .pipe(pug({
          pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest((file) => {
          pugPrintFileChange(file)
          return DEST
        }))
})
gulp.task('pugWatch', ['pug'], reload)

// ===== Pug Includes Update All ================================================
gulp.task('includesUpdate', function updateHTML () {
  return gulp.src(PUG_FILES)
        .pipe(plumber({
          errorHandler: function (error) {
            beep(2)
            console.log('<======= Pug Inclides Error ========>')
            console.log(error.message)
            this.emit('end')
          }
        }))
        .pipe(pug({
          pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest((file) => {
          pugPrintFileChange(file)
          return DEST
        }))
})
gulp.task('includesUpdateWatch', ['includesUpdate'], reload)

// ===== SASS >> CSS ===============================================
gulp.task('sass', function () {
  var date = new Date()
  var timeStamp = '/* Generado el :' + date + ' */\n\n'

  var plugins = [
    cssnano()
  ]

  return gulp.src(`${SRC}/sass/*.sass`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(header(timeStamp))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest((file) => {
      sassPrintFileChange(file)
      return mainCssDist
    }))
    .pipe(browserSync.stream({match: '**/*.css'}))
})

// ===== JS >> Bundel ===============================================
gulp.task('js', function () {
  var date = new Date()
  var timeStamp = '/* Generado el :' + date + ' */\n\n'

  return browserify({
    entries: mainJsSrc,
    debug: true
  })
  .transform(
    'babelify',
    {
      presets: ['es2015']
    }
  )
  .bundle()
  .pipe(plumber({
    errorHandler: function (error) {
      beep(2)
      console.log('<======= Build Js Error ========>')
      console.log(error.message)
      console.log(error.cause)
      console.log(Object.keys(error))
      this.emit('end')
    }}))
  .pipe(source(mainJsFileIn))
  .pipe(buffer())
  .pipe(sourcemaps.init({
    loadMaps: true
  }))
  .pipe(uglify())
  .pipe(header(timeStamp))
  .pipe(sourcemaps.write('./maps'))
  .pipe(plumber.stop())
  .pipe(gulp.dest((file) => {
    jsPrintFileChange(file)
    return mainJsDist
  }))
})
gulp.task('jsWatch', ['js'], reload)

// ===== JS Lint ===============================================
gulp.task('lint', () => {
  return gulp.src(jsToLint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

// ===== Move Assets ===============================================
gulp.task('moveAssets', function () {
  return gulp.src(`./assets/**/*.{gif,jpg,png,eot,svg,ttf,woff}`)
    .pipe(gulp.dest(mainAssetsDist))
})
gulp.task('moveAssetsWatch', ['moveAssets'], reload)

// ===== Move Assets ===============================================
gulp.task('moveJSON', function () {
  return gulp.src(`${SRC}/json/*.json`)
    .pipe(gulp.dest((file) => {
      jsonPrintFileChange(file)
      return mainJsonDist
    }))
})
gulp.task('moveJSONWatch', ['moveJSON'], reload)

// ===== Clean ===============================================
gulp.task('clean', function () {
  return del(DEST, {force: true})
})

// ===== Default ===============================================
gulp.task('serve', ['pug', 'sass', 'js', 'moveAssets', 'moveJSON'], function () {
  browserInit()

  gulp.watch(`${SRC}/**/*.pug`, ['pugWatch'])
  gulp.watch(`${SRC}/pug/_includes/*.pug`, ['includesUpdateWatch'])

  gulp.watch(`${SRC}/**/*.sass`, ['sass'])

  gulp.watch(`${SRC}/**/*.js`, ['jsWatch'])

  gulp.watch(`./assets/**/*.{gif,jpg,png,eot,svg,ttf,woff}`, ['moveAssetsWatch'])
  gulp.watch(`${SRC}/json/*.json`, ['moveJSONWatch'])
})

gulp.task('default', ['serve'])

// ===== Custome Fuctions ============================================
var getFileName = function (url) {
  if (url === undefined) return ''
  var index = url.lastIndexOf('/') + 1
  return url.substr(index)
}

var getParentFolder = function (url) {
  if (url === undefined) return ''
  var splitUrl = url.split('/')
  return splitUrl[ splitUrl.length - 2 ]
}

function browserInit () {
  browserSync({
    server: DEST,
    browser: 'google chrome',
    port: PORT
  })
  beep(2)
}

var jsonPrintFileChange = function (file) {
  gutil.log(
    gutil.colors.magenta('----'),
    getFileName(file.history[0]),
    gutil.colors.cyan('▸▸▸▸'),
    gutil.colors.magenta('re-ubicado')
  )
}

var jsPrintFileChange = function (file) {
  let message = ''
  message = (file.history.length < 2) ? getFileName(file.history[0]) : getFileName(file.history[1])
  gutil.log(
    gutil.colors.magenta('----'),
    getFileName(message),
    gutil.colors.cyan('generado')
  )
}

var pugPrintFileChange = function (file) {
  gutil.log(
    gutil.colors.magenta('----'),
    gutil.colors.magenta(getParentFolder(file.history[0])),
    getFileName(file.history[0]),
    gutil.colors.cyan('▸'),
    getFileName(file.history[1])
  )
}

var sassPrintFileChange = function (file) {
  gutil.log(
    gutil.colors.magenta('----'),
    getFileName(file.history[0]),
    gutil.colors.cyan('▸'),
    getFileName(file.history[1])
  )
}
