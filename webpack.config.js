const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const PATHS = {
    app: path.join(__dirname, "src"),
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
]);

const productionConfig = merge([
    parts.extractCSS(),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
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