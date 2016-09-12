// SASS Compiler con SASS(3.3.3) y Compass(1.0.1)
// ====================================
module.exports = function (gulp, plugins) {
    gulp.src('./sass/*.sass')
      .pipe(plugins.plumber({
        errorHandler: function (error) {
          console.log("<======= Compass Error ========>");
          console.log(error.message);
          this.emit('end');
      }}))
      .pipe(plugins.compass({
          style:      'compact',
          environment: 'development',
          css:        './paralimpicos/css',
          sass:       './sass',
          image:      './paralimpicos/img',
          javascript: './paralimpicos/js',
          font:       './paralimpicos/css/fonts',
          time:       true
      }))
};
