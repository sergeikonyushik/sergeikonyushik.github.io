//Подключаем галп
const gulp = require('gulp');
//Объединение файлов
const concat = require('gulp-concat');
//Добапвление префиксов
const autoprefixer = require('gulp-autoprefixer');
//Оптисизация стилей
const cleanCSS = require('gulp-clean-css');
//Оптимизация скриптов
const uglify = require('gulp-uglify');
//Удаление файлов
const del = require('del');
//Синхронизация с браузером
const browserSync = require('browser-sync').create();
//Для препроцессоров стилей
const sourcemaps = require('gulp-sourcemaps');
//Less препроцессор
const sass = require('gulp-sass');

const imagemin = require('gulp-imagemin');

//Порядок подключения файлов со стилями
const styleFiles = [
   './src/sass/normalize.scss',
   './src/sass/style.scss'
]
//Таск для обработки стилей
gulp.task('styles', () => {
   //Шаблон для поиска файлов CSS
   //Всей файлы по шаблону './src/css/**/*.css'
   return gulp.src(styleFiles)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat('style.css'))
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(cleanCSS({
         level: 2
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());
});


//Таск для очистки папки build
gulp.task('del', () => {
   return del(['build/*'])
});

gulp.task('img-compress', ()=> {
   return gulp.src('./src/img/**')
   .pipe(imagemin({
      progressive: true,
      optimizationLevel: 3
   }))
   .pipe(gulp.dest('./build/img/'))
});

//Таск для отслеживания изменений в файлах
gulp.task('watch', () => {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
   gulp.watch('./src/img/**', gulp.series('img-compress'))
   gulp.watch('./src/sass/**/*.scss', gulp.series('styles'))
   gulp.watch("./*.html").on('change', browserSync.reload);
});

//Таск по умолчанию, Запускает del, styles, scripts и watch
gulp.task('default', gulp.series('del', gulp.parallel('styles', 'img-compress'), 'watch'));