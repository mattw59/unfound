const path = require('path');

module.exports = {
  entry: './unfound.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'unfound.js'
  }
};