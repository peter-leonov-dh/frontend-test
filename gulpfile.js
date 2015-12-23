// source: http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');


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
  dst: 'public/js',
  min: 'app.js'
}
gulp.task('js', function(){
  gulp.src(js.watch)
    .pipe(concat(js.min))
    .pipe(gulp.dest(js.dst));
});


gulp.task('watch', function(){
  // add production build as a second task for heavy lifting stuff
  gulp.watch(js.watch, ['js']);
  gulp.watch(css.watch, ['css']);
});

gulp.task('default', ['watch']);
