const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join( __dirname, 'dist' ),
        port: 8080,
        historyApiFallback: true,
        https: {
            cert: path.resolve( __dirname, 'certs', 'example.com+5.pem' ),
            key: path.resolve( __dirname, 'certs', 'example.com+5-key.pem' )
        }
    },
});
