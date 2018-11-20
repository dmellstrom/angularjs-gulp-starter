const { series, parallel, src, dest } = require('gulp'),
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


const scripts = [
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

const styles = [
  'app/index.scss',
  'app/directives/**/*.scss',
  'app/views/**/*.scss'
], styleIncludes = [
  'node_modules/angular-material'
];


/* Development *///////////////////////////////////////////

function js() {
  return src(scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(dest('app'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('app'));
}

function css() {
  return src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.scss'))
    .pipe(sass({ includePaths: styleIncludes }).on('error', sass.logError))
    .pipe(dest('app'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('app'));

}

function serve(done) {
  connect.server({
    root: 'app/',
    port: 8888,
    fallback: 'app/index.html',
    livereload: true
  }, done);
}

const built = ['app/app.min.css', 'app/app.min.js', 'app/**/*.html'];

function reload(done) {
  src(built)
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

exports.default = series(
  parallel(js, css),
  parallel(serve, reload, watch_src)
);


/* Distribution *//////////////////////////////////////////

function dist_clean() {
  return del(['dist/**/*']);
}

const templates = [
  'app/**/*.html',
  '!app/index.html'
];

function partials() {
  return src(templates)
    .pipe(angularTemplatecache('templates.js', {
      moduleSystem: 'IIFE',
      transformUrl: function(url) {
        // Remove leading slash which occurs in gulp 4
        return url.replace(/^\/+/g, '');
      }
    }))
    .pipe(dest('dist'));
}

function dist_js_build() {
  return src(scripts.concat(['dist/templates.js']))
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({add: true}))
    .pipe(uglify())
    .pipe(dest('dist'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist'));
}

function dist_js() {
  return del(['dist/templates.js']);
}

function dist_css() {
  return src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.scss'))
    .pipe(sass({ includePaths: styleIncludes }).on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(dest('dist'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist'));
}

function revision() {
  return src(['dist/app.min.css', 'dist/app.min.js'])
    .pipe(rev())
    .pipe(dest('dist'))
    .pipe(rev.manifest())
    .pipe(dest('dist'))
}

function dist_index() {
  const manifest = src('dist/rev-manifest.json');
  return src('app/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(dest('dist'));
}

function dist_app() {
  return del(['dist/app.min.css', 'dist/app.min.js']);
}

function dist_favicon() {
  return src('app/favicon.png')
    .pipe(dest('dist'));
}

function dist_images() {
  return src('app/images/**/*.*')
    .pipe(dest('dist/images'));
}

exports.build = series(
  dist_clean,
  parallel(
    series(
      parallel(
        series(partials, dist_js_build, dist_js),
        dist_css
      ),
      revision,
      dist_index,
      dist_app
    ),
    dist_favicon,
    dist_images
  )
);

function dist_serve(done) {
  connect.server({
    root: 'dist/',
    port: 8888,
    fallback: 'dist/index.html'
  });
  done();
}
exports.dist_serve = dist_serve;

function deploy_staging() {
  return shell.task([
  "rsync -azvP dist/ root@203.0.113.255:/var/www/html --exclude=\".git/\" --delete",
  ]);
}