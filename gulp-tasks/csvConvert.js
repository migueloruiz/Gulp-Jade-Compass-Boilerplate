//
// Convierte el archivo all.csv en agenda.json
//======================================

module.exports = function (gulp, plugins) {
    return function () {
        console.log("Converting CSV to JSON....");
        gulp.src('paralimpicos/csv/all.csv')
            .pipe(plugins.csvtojson({ toArrayString: true}))  //, delimiter: [";"]
            .pipe(plugins.insert.prepend('{"items":'))
            .pipe(plugins.insert.append('}'))
            .pipe(plugins.rename("agenda.json"))
            .pipe(gulp.dest('paralimpicos/json'));
    };
};
