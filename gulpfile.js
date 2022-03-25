
const { series, src, dest, watch } = require('gulp');
const plugins = require('gulp-load-plugins')({ camelize: true });
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssObjectFitImages = require('postcss-object-fit-images');
const config = require('./gulpconfig.js');

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
}


function addThemeCss() {
  return src(['src/theme-overrides.css']).pipe(dest(config.dest.scss));
}

function buildTheme() {
  return src(['src/fields.json', 'src/theme.json']).pipe(dest(config.dest.theme));
}

function buildModules() {
  return src(['src/modules/**/*', '!src/modules/**/fields/*']).pipe(dest(config.dest.modules));
}

function buildTemplates() {
  return src(['src/templates/**/*', '!src/templates/**/fields/*']).pipe(dest(config.dest.templates));
}

const Build = series(buildScss, addThemeCss, buildModules, buildTemplates, buildTheme);



const Watch = function () {
  watch(['src/**/*.scss'], Build);
};

exports.watch = Watch;
exports.build = Build;
