
const sass = require('gulp-sass')(require('sass'));
const plugins = require('gulp-load-plugins')({ camelize: true });
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcssObjectFitImages = require('postcss-object-fit-images');
const config = require('./gulpconfig.js');
const path = require('path');
const fs = require('fs');
const del = require('del');
const { series, src, dest, watch } = require('gulp');
var exec = require('gulp-exec');
const sassGlob = require('gulp-sass-glob'); // Ajoutez cette ligne


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
    .pipe(sassGlob()) // Utilisez gulp-sass-glob pour prendre en charge les wildcards
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(dest(config.dest.scss))
    .pipe(exec('yarn deploy-prod:css'));
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

function buildImages() {
  return src(['src/images/**/*', '!src/images/*']).pipe(dest(config.dest.images));
}

const buildCss = series(buildScss, addThemeCss);
const buildhtml = series(buildModules, buildTemplates, buildTheme, buildImages);
const Build = series(buildScss, addThemeCss, buildModules, buildTemplates, buildTheme);

const Watch = function () {
  watch(['src/**/*.scss', 'src/**/*.html'], Build);
};

exports.watch = Watch;
exports.buildCss = buildCss;
exports.buildhtml = buildhtml;
