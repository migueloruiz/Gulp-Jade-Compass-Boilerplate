//
// Elimina el archivo all.csv
//======================================
module.exports = function (gulp, plugins) {
    return function () {
        console.log("Borrando all.csv....");
        gulp.src('./paralimpicos/csv/all.csv', {read: false})
            .pipe(plugins.clean());
    };
};
