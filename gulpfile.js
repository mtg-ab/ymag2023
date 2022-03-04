const path = require('path');
const fs = require('fs');
const del = require('del');
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
    .pipe(dest(config.dest.scss));
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

function buildModuleFields(cb) {
  //Get path to /src/modules
  const jsonPath = path.join(__dirname, 'src', 'modules');

  //Try to read the directory...
  fs.readdir(jsonPath, function(err, files) {
    //If no directory found...
    if (err) {
      process.exit(1); 
    }

    //Loop through all folders in the directory
    files.forEach(function(file) {
      //Get path to /src/modules/{module}/fields/fields.js
      const fieldsFile = path.join(__dirname, 'src', 'modules', file, 'fields', 'fields.js');

      //Skip if file doesn't exist...
      if (!fs.existsSync(fieldsFile)) return false;

      //Config file that lists all .json files
      const fields = require(`${__dirname}/src/modules/${file}/fields/fields.js`);

      //Merge all .json files into fields.json
      return src(fields.config())
        .pipe(plugins.concat('fields.json', { newLine: ',\n' }))
        .pipe(plugins.header('['))
        .pipe(plugins.footer(']'))
        .pipe(dest(`src/modules/${file}/`));
    });
  });

  //Gulp needs this to finish up the function
  cb();
}

function buildMacros() {
  return src(config.src.macros).pipe(dest(config.dest.macros));
}

const Build = series(buildScss, buildMacros, buildTheme, addThemeCss, buildModules, buildTemplates);


const GenerateFields = series(buildModuleFields);

const Watch = function() {
  watch(['src/modules/**/fields/fields.js'], GenerateFields);
  watch(['src/**/*.scss', 'src/**/*.html', 'src/**/*.js', '!src/modules/**/fields/fields.js'], Build);
};

exports.watch = Watch;
exports.build = Build;
exports['generate-fields'] = GenerateFields;
