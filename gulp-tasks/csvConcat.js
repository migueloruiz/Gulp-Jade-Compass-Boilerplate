//
// Concatenta los archivos *.csv en all.csv
//======================================
module.exports = function (gulp, plugins) {
    return function () {
        console.log("Concat CSV files....");
        gulp.src('paralimpicos/csv/*.csv')
          .pipe(plugins.concat('all.csv', {newLine: ''}))
          .pipe(plugins.insert.prepend('channelId,begintime,duration,evNombre,evDescription,providerId\n'))
          .pipe(gulp.dest('paralimpicos/csv'));
    };
};
