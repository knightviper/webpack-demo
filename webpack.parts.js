const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        filename: "[name].css", 
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
                        ],
                },
            ],
        },
        plugins: [plugin],
    };
};

module.exports = {
    devServer,
    loadCSS,
    extractCSS,
}