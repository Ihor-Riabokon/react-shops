const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './client/public/js/Main.js'),
    output: { filename: 'bundle.js', path: path.resolve(__dirname, './client/public/js/dist') },
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