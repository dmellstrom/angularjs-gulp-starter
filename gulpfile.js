var gulp    = require('gulp'),
  angularTemplatecache = require('gulp-angular-templatecache'),
  cleanCss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  del = require('del'),
  ngAnnotate = require('gulp-ng-annotate'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
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

function js() {
  return gulp.src(scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(gulp.dest('app'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app'));
}

function css() {
  return gulp.src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.scss'))
    .pipe(sass({ includePaths: styleIncludes }).on('error', sass.logError))
    .pipe(gulp.dest('app'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app'));

}

function serve(done) {
  connect.server({
    root: 'app/',
    port: 8888,
    fallback: 'app/index.html',
    livereload: true
  }, done);
}

var built = ['app/app.min.css', 'app/app.min.js', 'app/**/*.html'];

function reload(done) {
  gulp.src(built)
    .pipe(watch(built))
    .pipe(connect.reload());
  done();
}

function watch_src(done) {
  watch(scripts, function() {
    js();
  });
  watch(styles, function() {
    css();
  });
  done();
}

gulp.task('default',
  gulp.series(
    gulp.parallel(js, css),
    gulp.parallel(serve, reload, watch_src)));


/* Distribution *//////////////////////////////////////////

function dist_clean() {
  return del(['dist/**/*']);
}

var templates = [
  'app/**/*.html',
  '!app/index.html'
];

function partials() {
  return gulp.src(templates)
    .pipe(angularTemplatecache('templates.js', {
      moduleSystem: 'IIFE',
      transformUrl: function(url) {
        // Remove leading slash which occurs in gulp 4
        return url.replace(/^\/+/g, '');
      }
    }))
    .pipe(gulp.dest('dist'));
}

function dist_js_build() {
  return gulp.src(scripts.concat(['dist/templates.js']))
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
}

function dist_js() {
  return del(['dist/templates.js']);
}

function dist_css() {
  return gulp.src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.scss'))
    .pipe(sass({ includePaths: styleIncludes }).on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
}

function revision() {
  return gulp.src(['dist/app.min.css', 'dist/app.min.js'])
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'))
}

function dist_index() {
  var manifest = gulp.src('dist/rev-manifest.json');
  return gulp.src('app/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('dist'));
}

function dist_app() {
  return del(['dist/app.min.css', 'dist/app.min.js']);
}

function dist_favicon() {
  return gulp.src('app/favicon.png')
    .pipe(gulp.dest('dist'));
}

function dist_images() {
  return gulp.src('app/images/**/*.*')
    .pipe(gulp.dest('dist/images'));
}

gulp.task('build', gulp.series(
  dist_clean,
  gulp.parallel(
    gulp.series(
      gulp.parallel(
        gulp.series(partials, dist_js_build, dist_js),
        dist_css),
      revision,
      dist_index,
      dist_app),
    dist_favicon,
    dist_images)));

function dist_serve(done) {
  connect.server({
    root: 'dist/',
    port: 8888,
    fallback: 'dist/index.html'
  });
  done();
}
gulp.task(dist_serve);

gulp.task('deploy_staging', shell.task([
  "rsync -azvP dist/ root@203.0.113.255:/var/www/html --exclude=\".git/\" --delete",
]));