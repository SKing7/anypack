//basic babel task
var paths = {
    babel : 'lib/*.js',
};
var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task('babel', function() {
  return gulp.src(paths.babel)
  .pipe(babel())
  .pipe(gulp.dest('test/lib'))
})
gulp.task('babel-build', function() {
  return gulp.src(paths.babel)
  .pipe(babel())
  .pipe(gulp.dest('build'))
})
gulp.task('watch', ['babel'], function() {
  gulp.watch(paths.babel, ['babel'])
})
gulp.task('default', ['babel-build']);
