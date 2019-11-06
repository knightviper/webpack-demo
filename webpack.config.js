const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        stats: "errors-only", //Displays only errors to reduce the amount of output
        host: process.env.HOST, //Defaults to localhost
        port: process.env.PORT, //Defaults to 8080
        open: true, //Open the page in browser
        overlay: true, //Captures compilation related warnings and errors
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Demo",
        }),
    ],
};