var gulp = require('gulp'),
    del = require('del'),
    react = require('gulp-react'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    rename = require('gulp-rename');
    deploy = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy());
});

// Clean task
// Clears and removes generated files
gulp.task('clean', function() {
    del([
        'dist'
    ]);
});

// React task
// Turns JSX files into JS and stores them in approprate src folder
gulp.task('react', function() {
    return gulp.src(['src/jsx/*.jsx'])
        .pipe(plumber())
        .pipe(react())
        .pipe(gulp.dest('src/js'));
});

// Copy Lib Task
// Copies required library files into distribution directory
gulp.task('copy-lib', function() {
    gulp.src([
            'bower_components/react/react.js',
            'bower_components/jquery/dist/jquery.js',
            'local_components/widget/widget.js',
            'local_components/waveformjs/waveform.js'
        ])
        .pipe(gulp.dest('dist/lib'));
});

// Copy Assets Task
// Copies required asset files into distribution directory
gulp.task('copy-assets', function() {
    gulp.src([
            'local_components/weekndSVG/weeknd.svg'
        ])
        .pipe(gulp.dest('dist/assets/svg'));
});

// Copy HTML Task
// Copies required HTML files into distribution directory
gulp.task('copy-html', function() {
    gulp.src([
            'src/html/*.html'
        ])
        .pipe(gulp.dest('dist'));
});

// Copy JS Task
// Copies required javascript files into distribution directory 
// Concatenates the JS files first
// Uglifies/compresses as a .min.js file as well
gulp.task('copy-js', function() {
    gulp.src([
            'src/js/*.js'
        ])
        .pipe(plumber())
        .pipe(concat('weeknd.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist/js'));
});

// Copy SASS Task
// Copies required SCSS files into distribution directory
// Precomipler generates the necessary .css files
// Creates a minified version .min.css file as well
gulp.task('copy-sass', function() {
    // Copies and generates main .css file (excludes partials)
    return sass('src/sass/weeknd.scss', {
            style: 'expanded'
        })
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css'))
        .pipe(plumber())
        .pipe(minifyCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', ['copy-html'], function(){
    browserSync.reload();
});

gulp.task('js', ['copy-js'], function(){
    browserSync.reload();
});

gulp.task('sass', ['copy-sass'], function(){
    browserSync.reload();
});

// Copy Task
// Copies necessary files to distribution directory
gulp.task('copy', ['copy-lib', 'copy-assets', 'copy-html', 'copy-js', 'copy-sass']);

// Reload all Browsers
gulp.task('reload', function () {
    browserSync.reload();
});

// Watch Task
// Watches for any changes in the src folder and rebuilds distribution folder
gulp.task('watch', function() {
    browserSync.init({
        server: {
            injectChanges: true,
            baseDir: 'dist'
        }
    });

    gulp.watch(['src/html/**/*.html'], ['html']);
    gulp.watch(['src/js/**/*.js'], ['js']);
    gulp.watch(['src/sass/*.scss'], ['sass']);
    gulp.watch(['src/jsx/**/*.jsx'], ['react']);

    //browserSync.stream();

});

gulp.task('default', ['react', 'copy', 'watch']);