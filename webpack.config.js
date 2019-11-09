const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack Course Demo",
            }),
        ],
    },
]);

const productionConfig = merge([
    parts.extractCSS(),
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST, 
        port: process.env.PORT,
    }),
    parts.loadCSS(),
]);

module.exports = mode => {
    if(mode === 'production'){
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};