const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: path.resolve(__dirname, './client/public/js/Main.js'),
    output: { filename: 'bundle.min.js', path: path.resolve(__dirname, './client/public/js/dist') },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', 'react']
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};