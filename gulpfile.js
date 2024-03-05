'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;

gulp.task('img', function () {
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|webp)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
})

gulp.task('video', function() {
    return gulp.src('app/video/**/*')
      .pipe(gulp.dest('dist/video'))
})

gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('js', function () {
    return pipeline(
        gulp.src('app/js/*.js'),
        uglify(),
        gulp.dest('dist/js')
    );
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('app/js/*.js', gulp.series('js'));
})

// exports.default = sass;
