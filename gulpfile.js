const { series, src, dest, watch } = require('gulp');
const plugins = require('gulp-load-plugins')({ camelize: true });
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssObjectFitImages = require('postcss-object-fit-images');
const config = require('./gulpconfig.js');
var exec = require('gulp-exec');

function buildScss() {
  const postcssPlugins = [
    autoprefixer(),
    postcssObjectFitImages(),
    postcssPresetEnv({
      stage: 0,
    }),
    cssnano(),
  ];

  return src(config.src.scss)
    .pipe(plugins.sassGlobImport())
    .pipe(plugins.sass())
    .pipe(plugins.postcss(postcssPlugins))
    .pipe(dest(config.dest.scss))
    .pipe(exec('yarn deploy-dev:css'))

}

function buildTheme() {
  return src(['src/fields.json', 'src/theme.json']).pipe(dest(config.dest.theme));
}

function addThemeCss() {
  return src(['src/theme-overrides.css']).pipe(dest(config.dest.scss));
}

function buildModules() {
  return src(['src/modules/**/*', '!src/modules/**/fields/*']).pipe(dest(config.dest.modules));
}

function buildTemplates() {
  return src(['src/templates/**/*', '!src/templates/**/fields/*']).pipe(dest(config.dest.templates));
}

<<<<<<< HEAD
const buildCss = series(buildScss, addThemeCss);
=======

const buildCss = series(buildScss, addThemeCss,buildModules, buildTemplates, buildTheme);
>>>>>>> ff90f9eea84ce7f848e2b55e7cc3b7f5c0a12ad5
const _buildModules = series(buildModules);
const Build = series(buildScss, addThemeCss, buildModules, buildTemplates, buildTheme);



const Watch = function () {
  watch(['src/**/*.scss'], buildCss);
};

exports.watch = Watch;
exports.buildCss = buildCss;
exports.buildModules = _buildModules;

