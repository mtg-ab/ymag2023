const path = require('path')
var glob = require("glob");
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: {
    main: glob.sync("./src/js/**/*.js"),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
  },
  plugins: [
    new WebpackShellPluginNext({
      onDoneWatch: {
        scripts: ['yarn deploy-dev:js'],
        blocking: true,
        parallel: false
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
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
  },

}