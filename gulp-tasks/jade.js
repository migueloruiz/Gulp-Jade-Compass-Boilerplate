// Jade >> HTML
// ====================================
module.exports = function (gulp, plugins) {
    gulp.src('./paralimpicos/**/*.jade')
        .pipe(plugins.plumber({
          errorHandler: function (error) {
            console.log("<======= Jade Error ========>");
            console.log(error.message);
            this.emit('end');
        }}))
		.pipe(plugins.jade({
			pretty: true
    	}))
		//.pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }))
};
