var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('build', function(done) {
  gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    // .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('./build'))
    .on('end', done);
});

gulp.task('test', ['build'], function(done) {
  // TODO: tests are must nowadays,
  // but I don't have enough know-how yet
  return done();
});

gulp.task('start', ['test'], function() {
  nodemon({
    watch: ['./src/'],
    script: './build/index.js',
    nodeArgs: '--debug',
    tasks: ['test']
  });
});

gulp.task('default', ['start']);
