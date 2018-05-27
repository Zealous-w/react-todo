var path = require("path")

module.exports = {
    entry: {
        index : "./index.js"
    },

    output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
    },
    mode : 'development',
    module: {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
            {
                loader: 'babel-loader',
                options: {
                presets: ['react']
                }
            }
            ],
        },
        {
            test: /\.css?$/,
            loader: 'style-loader!css-loader'
        }
    ]
    },
}