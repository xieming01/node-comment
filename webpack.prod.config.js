const UglifyJsPlugin = require("uglifyes-webpack-plugin")

module.exports = {
    output: {
        filename: 'bundle.min.js',
    },
    plugins: [
        new UglifyJsPlugin()
    ]
} 