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
        ],
    },
});

module.exports = {
    devServer,
    loadCSS,
}