var webpack = require('webpack');
module.exports = {
    entry: "./src/build.tsx",
    output: {
        filename: "build.js",
        path: __dirname + "/build/dist",
        publicPath: "/build/dist",
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            warning: false,
            mangle: true,
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        //全局变量
        new webpack.ProvidePlugin({
            plupload: 'plupload'
        }),
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader?url=false', 'css-loader?url=false'] },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    silent: true
                }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};