const path = require('path');
module.exports = {
    entry: './public/js/webpack.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: './components.js'
    }
}
