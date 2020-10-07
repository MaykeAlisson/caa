const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, './src/sw.js'),
        }),
        new FaviconsWebpackPlugin({
            logo:  "./public/images/logo-192x192.png",
        }),
        new WebpackPwaManifest({
            filename: 'manifest.json',
            name: 'Novo Anjo',
            short_name: 'Novo Anjo',
            description: 'Novo Anjo Web App!',
            display: 'standalone',
            orientation: 'portrait',
            start_url: '/',
            background_color: '#00A651',
            theme_color: '#00A651',
            inject: true,
            crossorigin: 'anonymous', //can be null, use-credentials or anonymous
            ios : true ,
            // icons: [
            //     {
            //         src: path.resolve(__dirname,'./public/images/logo-192x192.png'),
            //         type: 'image/png',
            //         size: '192x192'
            //     },
            //     {
            //         src: path.resolve(__dirname,'./public/images/logo-512x512.png'),
            //         type: 'image/png',
            //         size: '512x512'
            //     },
            //     {
            //         src: path.resolve(__dirname,'./public/images/logo-152x152.png'),
            //         type: 'image/png',
            //         size: '152x152',
            //         ios : true
            //     },
            //     {
            //         src: path.resolve(__dirname,'./public/images/logo-167x167.png'),
            //         type: 'image/png',
            //         size: '167x167',
            //         ios : true
            //     },
            //     {
            //         src: path.resolve(__dirname,'./public/images/logo-180x180.png'),
            //         type: 'image/png',
            //         size: '180x180',
            //         ios : true
            //     },
            // ]
        })
    ],
    resolve: {
        alias: {
            Commons: path.resolve(__dirname, 'src', 'commons'),
            Contexts: path.resolve(__dirname, 'src', 'contexts'),
            Services: path.resolve(__dirname, 'src', 'services'),
            Components: path.resolve(__dirname, 'src', 'infra', 'components'),
            Util: path.resolve(__dirname, 'src', 'infra', 'util'),
            Icons: path.resolve(__dirname, 'src', 'infra', 'icons'),
            Repository: path.resolve(__dirname, 'src', 'repository')
        },
        extensions: ['.js', '.jsx']
    },
};