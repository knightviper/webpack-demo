const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only", //Displays only errors to reduce the amount of output
        host, //Defaults to localhost
        port, //Defaults to 8080
        open: true,
        overlay: true,
    },
});

const loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                include,
                exclude,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
    },
});

const extractCSS = ({ include, exclude } = {}) => {
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].[contenthash:4].css", 
    });

    return {
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    include,
                    exclude,
                    use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            'css-loader',
                            'sass-loader',
                            autoprefix(),
                        ],
                },
            ],
        },
        plugins: [plugin],
    };
};

const purifyCSS = ({ paths }) => ({
    plugins: [
        new PurifyCSSPlugin({ 
            paths,
            purifyOptions: {
                minify: true,
            },
        }),
    ]
});

const autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")],
    },
});

const loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                include,
                exclude,
                use: [
                    {
                        loader: "url-loader",
                        options,
                    },{
                        loader: "image-webpack-loader",
                    }
                ],
            },
        ],
    },
});

const loadFONTS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 50000,
                        name: "./fonts/[name].[ext]",
                    },
                },
            },
        ],
    },
});

const loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader",
            },
        ],
    },
});

const generateSourceMaps = ({ type }) => ({
    devtool: type,
});

const clean = (path) => ({
    plugins: [new CleanWebpackPlugin()],
});

const attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version(),
        }),
    ],
});

const minifyJavascript = () => ({
    optimization: {
        minimizer: [new TerserPlugin({ sourceMap: true })],
    },
});

const minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false,
        }),
    ],
});

const setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [new webpack.DefinePlugin(env)],
    };
};

module.exports = {
    devServer,
    loadCSS,
    extractCSS,
    purifyCSS,
    loadImages,
    loadFONTS,
    loadJavaScript,
    generateSourceMaps,
    clean,
    attachRevision,
    minifyJavascript,
    minifyCSS,
    setFreeVariable,
}