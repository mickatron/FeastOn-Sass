const gulp = require('gulp');
const sassdoc = require('sassdoc');
const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');
const runSequence = require('run-sequence');
const fs = require('fs');
const del = require('del');

const docFolder = './docs';
const srcFiles = './lib/**/*.scss';

gulp.task('sassdoc', () => gulp.src(srcFiles)
  .pipe(sassdoc({
    dest: docFolder,
    verbose: true,
  })));

gulp.task('clean', () => del(docFolder));

// $ gulp watch
gulp.task('watch', () => {
  gulp.watch([srcFiles], ['sassdoc']);
});

// $ gulp
// `gulp` - Run a complete build.
gulp.task('default', ['clean'], () => {
  gulp.start('sassdoc');
});

// $ gulp release --type (major || minor || patch)
gulp.task('release', callback => runSequence(
  'bump-version',
  'commit-changes',
  'push-changes',
  'create-new-tag',
  // 'github-release',
  (error) => {
    if (error) {
      console.log(error.message); // eslint-disable-line no-console
    } else {
      console.log('RELEASE FINISHED SUCCESSFULLY'); // eslint-disable-line no-console
    }
    callback(error);
  } // eslint-disable-line comma-dangle
  // TODO: revise the above disabled line.
));

gulp.task('bump-version', () => {
  const type = gutil.env.type || 'patch';
  console.log('Release patch type: ', type); // eslint-disable-line no-console
  // We hard code the version change type to 'patch' but it may be a good idea to
  // use minimist (https://www.npmjs.com/package/minimist) to determine with a
  // command argument whether you are doing a 'major', 'minor' or a 'patch' change.
  return gulp.src(['./package.json'])
    .pipe(bump({ type }).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', () => gulp.src('.')
  .pipe(git.commit('[Prerelease] Bumped version number')));

gulp.task('push-changes', (cb) => {
  git.push('origin', 'master', cb);
});

function getPackageJsonVersion() {
  // We parse the json file instead of using require because require caches
  // multiple calls so the version number won't be updated
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

gulp.task('create-new-tag', (cb) => {
  const version = getPackageJsonVersion();
  git.tag(version, `Created Tag for version: ${version}`, (error) => {
    if (error) {
      return cb(error);
    }
    return git.push('origin', 'master', { args: '--tags' }, cb);
  });
});
