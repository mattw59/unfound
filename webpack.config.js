const path = require('path');

module.exports = {
  entry: './unfound.js',
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'unfound.js'
  }
};