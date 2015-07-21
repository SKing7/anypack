//basic babel task
var paths = {
    babel : 'src/*.js',
    dest: 'test/lib',
    testOutDest: 'test/dest',
};
var gulp = require("gulp");
var fs = require("fs");
var babel = require("gulp-babel");
var sourcemaps = require('gulp-sourcemaps');

gulp.task('runtest', function() {
    var pathOut = paths.testOutDest;
    var exec = require('child_process').execSync;

    if (!fs.existsSync(pathOut)) {
        exec('mkdir ' + pathOut);
    }
    exec('gulp babel && node test/index', function (error, stdout, stderr) {
        if (error) {
            console.error(error);
        }
    });

});
gulp.task('babel', function() {
  return gulp.src(paths.babel)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.dest))
})
gulp.task('watch', ['babel'], function() {
  gulp.watch(paths.babel, ['babel'])
})
