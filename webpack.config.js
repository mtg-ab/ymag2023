const path = require('path');
var glob = require("glob");

module.exports = {
  mode: 'production',
  entry: {
    main: glob.sync("./src/js/**/*.js"),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
    //filename: '[name]/dist/[name].bundle.js', // Hacky way to force webpack   to have multiple output folders vs multiple files per one path
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  }
}