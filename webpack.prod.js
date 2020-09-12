const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: './src/unfound.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'unfound.js'
    }
};