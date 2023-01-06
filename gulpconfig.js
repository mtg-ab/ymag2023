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
    images: 'dist/images',
  },
  dirs: {
    scss: 'src/scss/',
    theme: 'src/',
    modules: 'src/modules/',
    templates: 'src/templates/',
    images: 'src/images/',
  },
  src: {
    scss: 'src/scss/main.scss',
    theme: 'src/*',
    modules: 'src/modules/**/*',
    templates: 'src/templates/**/*',
    macros: 'src/macros/*',
    images: 'src/images/*',
  },
};

module.exports = config;
