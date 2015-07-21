//basic babel task
var paths = {
    babel : 'src/*.js',
};
var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task('babel', function() {
  return gulp.src(paths.babel)
  .pipe(babel())
  .pipe(gulp.dest('test/src'))
})
gulp.task('watch', ['babel'], function() {
  gulp.watch(paths.babel, ['babel'])
})
