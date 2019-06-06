// 引入工具
const gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css')
    gulp.task('html', () => {
        // src是去读取文件，gulp读取文件的方式是文件流
        // 通过pipe管道的方式去压缩html
        // 最后把压缩的结果放到dist目录里
        // **代表所有目录，*代表所有文件
        gulp.src('src/**/*.html')
            .pipe(htmlmin({
            removeComments: true,// 清除HTML注释
            collapseWhitespace: true,// 压缩HTML
            collapseBooleanAttributes: true,// 省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,// 删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,// 删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,// 删除<style>和<link>的type="text/css"
            minifyJS: true,// 压缩页面JS
            minifyCSS: true// 压缩页面CSS 
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
    
    })
    
    // 编译scss
    gulp.task('css', () => {
    gulp.src('src/css/**/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
    })
    //开启服务器
    gulp.task('server', () => {
        connect.server({
          root: 'dist', // 服务器的根路径
          livereload: true, // 自动刷新
        port: 888
    })
    })
    
    // js和libs文件移动
    gulp.task('move', () => {
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))

    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))

    
    })

    gulp.task('js',()=>{
        gulp.src('src/js/**/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
            .pipe(connect.reload())
    })
    
    gulp.task('watch',()=>{
        gulp.watch('src/**/*.html',['html'])
        gulp.watch('src/css/**/*.scss',['css'])
        gulp.watch('src/js/**/*.js',['js'])
    })
    gulp.task('default',['html','css','js','server','move','watch'])
