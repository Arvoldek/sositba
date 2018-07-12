const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

// Compile Sass & Inject Into Browser
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/hover.css/scss/hover.scss','src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Watch Sass & Server
gulp.task('serve', ['sass',], function(){
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss', 'node_modules/hover.css/scss/hover.scss', 'node_modules/hover.css/scss/_options.scss', 'node_modules/bootstrap/scss/_variables.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Fonts Folder to src/fonts
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

// Create and maintane production folder

  // Move Stock Files to Production folder
  gulp.task('moveStockJs', function(){
    return gulp.src('src/js/*')
      .pipe(gulp.dest("docs/js"));
  });
  gulp.task('moveStockFonts', function () {
    return gulp.src('src/fonts/*')
      .pipe(gulp.dest("docs/fonts"));
  });
  gulp.task('movefontcss', function () {
    return gulp.src('src/css/font-awesome.min.css')
      .pipe(gulp.dest("docs/css"));
  });

  // Move and minify html
  gulp.task('minifyHTML', function () {
    return gulp.src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('docs'));
  });

  // Move and minify css
  gulp.task('minifyCSS', () => {
    return gulp.src(['src/css/hover.css', 'src/css/bootstrap.css', 'src/css/style.css'])
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('docs/css'))
  });

  // Move and compress images
  gulp.task('imageMin', () =>
    gulp.src('src/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('docs/img'))
  );

gulp.task('finishProject', ['moveStockJs','moveStockFonts', 'movefontcss', 'minifyHTML', 'minifyCSS', 'imageMin']);

gulp.task('default', ['js', 'serve', 'fa', 'fonts',]);