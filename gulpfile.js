var gulp = require('gulp');

//Define your paths to deploy
const SCREEPSPATH = "/home/kevin/.config/Screeps/scripts/screeps.com/default";

//Copies all js Files from scripts to SCREEPSPATH
gulp.task('deploy', function () {
    gulp.src('scripts/*.js')
        .pipe(gulp.dest(SCREEPSPATH));
});