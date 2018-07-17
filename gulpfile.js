var gulp    = require('gulp'),
  angularTemplatecache = require('gulp-angular-templatecache'),
  cleanCss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  del = require('del'),
  ngAnnotate = require('gulp-ng-annotate'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  shell = require('gulp-shell'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify  = require('gulp-uglify'),
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


/* Distribution *//////////////////////////////////////////

gulp.task('dist:clean', function() {
  return del(['dist/**/*']);
});

var partials = [
  'app/**/*.html',
  '!app/index.html'
];

gulp.task('partials', function () {
  return gulp.src(partials)
    .pipe(angularTemplatecache('templates.js', { module: process.env.npm_package_config_module }))
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:js-build', ['partials'], function() {
  return gulp.src(scripts.concat(['dist/templates.js']))
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:js', ['dist:js-build'], function() {
  return del(['dist/templates.js']);
});

gulp.task('dist:css', function () {
  return gulp.src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.scss'))
    .pipe(sass({ includePaths: styleIncludes }).on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('revision', ['dist:css', 'dist:js'], function(){
  return gulp.src(['dist/app.min.css', 'dist/app.min.js'])
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'))
})

gulp.task('dist:index', ['revision'], function() {
  var manifest = gulp.src('dist/rev-manifest.json');
  return gulp.src('app/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:app', ['dist:index'], function() {
  return del(['dist/app.min.css', 'dist/app.min.js']);
});

gulp.task('dist:favicon', function() {
  return gulp.src('app/favicon.png')
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:images', function() {
  return gulp.src('app/images/**/*.*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'dist:clean',
    ['dist:app', 'dist:favicon', 'dist:images'],
    callback);
});

gulp.task('dist:serve', function () {
  connect.server({
    root: 'dist/',
    port: 8888,
    fallback: 'dist/index.html'
  });
});

gulp.task('deploy:staging', shell.task([
  "rsync -azvP dist/ root@203.0.113.255:/var/www/html --exclude=\".git/\" --delete",
]));