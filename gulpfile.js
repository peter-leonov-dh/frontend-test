// source: http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserify = require('browserify');
var webserver = require('gulp-webserver');
var source = require('vinyl-source-stream');


var css = {
  watch: ['src/css/*.scss', 'src/css/**/*.scss'],
  in: ['src/css/style.scss'],
  out: 'style.css',
  dst: 'public/css'
}
gulp.task('css', function(){
  gulp.src(css.in)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(css.out))
    .pipe(gulp.dest(css.dst));
});


var js = {
  watch: ['src/js/*.js', 'src/js/**/*.js'],
  in: ['src/js/app.js'],
  out: 'app.js',
  dst: 'public/js'
}
gulp.task('js', function(){
  browserify({
    entries: js.in
  })
  .bundle()
  .pipe(source(js.out))
  .pipe(gulp.dest(js.dst));
});


gulp.task('default', function(){
  gulp.watch(js.watch, ['js']);
  gulp.watch(css.watch, ['css']);

  gulp.src('public').pipe(webserver());
});
