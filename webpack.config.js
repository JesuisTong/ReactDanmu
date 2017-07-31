const path = require('path');
const fs = require('fs');

function rm(pathname) {
    console.log('delete dist');
    if (!fs.existsSync(pathname)) {
        return;
    }
    if (fs.statSync(pathname).isDirectory()) {
        fs.readdirSync(pathname).forEach((item) => {
            rm(path.resolve(pathname, item));
        });
        fs.rmdirSync(pathname);
    } else {
        fs.unlinkSync(pathname);
    }
}('./dist');

module.exports = {
    entry: [
        './src/index.jsx',
        'webpack-dev-server/client?http://localhost:8080',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                },
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    }
};
