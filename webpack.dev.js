const fs = require("fs");

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
        // https: {
        //     key:  fs.readFileSync('/home/mayke/example.com+5-key.pem'),
        //     cert: fs.readFileSync('/home/mayke/example.com+5.pem'),
        //     ca: fs.readFileSync('/home/mayke/.local/share/mkcert/rootCA.pem')
        // }
    },
});