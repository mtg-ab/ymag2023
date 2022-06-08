/**
 * Gulp configuration
 */

const config = {
  project: 'make-the-grade',
  dest: {
    scss: 'dist/css',
    theme: 'dist/',
    modules: 'dist/modules',
    templates: 'dist/templates',
    macros: 'dist/macros',
  },
  dirs: {
    scss: 'src/scss/',
    theme: 'src/',
    modules: 'src/modules/',
    templates: 'src/templates/',
  },
  src: {
    scss: 'src/scss/main.scss',
    theme: 'src/*',
    modules: 'src/modules/**/*',
    templates: 'src/templates/**/*',
    macros: 'src/macros/*',
  },
};

module.exports = config;
