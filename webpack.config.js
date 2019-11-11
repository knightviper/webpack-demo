const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "dist"),
};

const parts = require('./webpack.parts');

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack Course Demo",
            }),
        ],
    },
    parts.loadFONTS(),
    parts.loadJavaScript({ include: PATHS.app }),
    parts.setFreeVariable("HELLO", "hello from config"),
]);

const productionConfig = merge([
    parts.extractCSS(),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
    parts.loadImages({
        options: {
           limit: 15000,
           name: "[name].[ext]", 
        },
    }),
    parts.generateSourceMaps({ type: 'source-map' }),
    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "initial",
                    },
                },
            },
        },
    },
    parts.clean(PATHS.build),
    parts.attachRevision(),
    parts.minifyJavascript(),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            safe: true,
        },
    }),
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST, 
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadImages(),
]);

module.exports = mode => {
    if(mode === 'production'){
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};