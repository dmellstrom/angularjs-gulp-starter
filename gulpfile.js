var gulp    = require('gulp'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  ngAnnotate = require('gulp-ng-annotate'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch');


var scripts = [
  'node_modules/angular/angular.js',
  'node_modules/angular-*/*.js',
  '!node_modules/angular*/*.min.js',
  '!node_modules/angular*/*.test.js',
  '!node_modules/angular*/*-mocks.js',
  '!node_modules/angular*/index.js',
  'app/index.js',
  'app/services/**/*.js',
  'app/directives/**/*.js',
  'app/views/**/*.js',
  '!app/**/*.test.js',
  '!app/app.min.js'
];

var styles = [
  'app/index.scss',
  'app/directives/**/*.scss',
  'app/views/**/*.scss'
], styleIncludes = [
  'node_modules/angular-material'
];


/* Development *///////////////////////////////////////////

gulp.task('js', function() {
  return gulp.src(scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(gulp.dest('app'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app'));
});

gulp.task('css', function () {
  return gulp.src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.scss'))
    .pipe(sass({ includePaths: styleIncludes }).on('error', sass.logError))
    .pipe(gulp.dest('app'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app'));
});

gulp.task('serve', function () {
  connect.server({
    root: 'app/',
    port: 8888,
    fallback: 'app/index.html',
    livereload: true
  });
});

var built = ['app/app.min.css', 'app/app.min.js', 'app/**/*.html'];

gulp.task('reload', function() {
  gulp.src(built)
    .pipe(watch(built))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  watch(scripts, function() {
    gulp.start('js');
  });
  watch(styles, function() {
    gulp.start('css');
  });
});

gulp.task('default', ['js', 'css', 'serve', 'reload', 'watch']);