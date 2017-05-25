var webpack = require('webpack');
var apiUrl = "http://myhr-uat.daikuan.com/"
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "build.js",
        path: __dirname + "/www/dist",
        publicPath: "/www/dist",

    },
    devServer: {
        // contentBase: "www", //本地服务器所加载的页面所在的目录
        inline: true, //检测文件变化，实时构建并刷新浏览器
        port: "8001",
        proxy: {
            '/uploads/': {
                target: apiUrl,
                secure: false,
                changeOrigin: true,
            },

            '/api/': {
                target: apiUrl,
                secure: false,
                changeOrigin: true
            },

        }
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    plugins: [

    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader?sourceMap=true&url=false', 'css-loader?sourceMap=true&url=false'] },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        // 'c': ["bootstrap.min.css", 'swiper.min.css', "layer.css", "style.css", "layer.js", 'swiper.min.js']
    },
};