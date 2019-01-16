const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    output: {
        filename: 'bundle.min.js',
    },
    plugins: [
        new UglifyJSPlugin({sourceMap: true})
    ]
} 