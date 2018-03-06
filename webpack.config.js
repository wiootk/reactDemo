var webpack = require('webpack');
var path = require('path'); //引入node的path库
var HtmlwebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;


var outputFile;
var plugins = [new HtmlwebpackPlugin({
      title: 'ReactDemo',
      template: path.resolve(__dirname, 'app/templates/index.ejs'),
      inject: 'body'
    })];

if (env === 'build') {
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'bundle.min.js';
} else {  
  outputFile = 'bundle.js';
}









var config = {
    entry: ['./app/index.js'], //入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 指定编译后的代码位置为 dist/bundle.js
        // filename: 'bundle.js'
        filename: outputFile
    },
    module: {
        rules: [
            // {
            //            test: /\.js$/,
            //            loader: 'babel-loader',
            //            exclude: /node_modules/
            //        }, 
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    // plugins: [
    //     new HtmlwebpackPlugin({
    //         title: 'ReactDemo',
    //         template: path.resolve(__dirname, 'app/templates/index.ejs'),
    //         inject: 'body'
    //     }),
    //     new UglifyJsPlugin({ minimize: true })
    // ],
    plugins: plugins,
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 3344,
        host: '172.168.1.70'
    },
    devtool: '#eval-source-map'
}
module.exports = config;