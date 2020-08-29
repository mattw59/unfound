const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

var config = {
  entry: './src/unfound.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'unfound.js'
  }
}

module.exports = (env, argv) => {
  if(argv.mode == 'production') {}
  if(argv.mode == 'development') {
    watch = true;
    devtool = 'inline-source-map';
  }
  return config;
};