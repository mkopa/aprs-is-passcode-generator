const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const buildPath = path.resolve(__dirname, 'docs');

module.exports = {
    entry: ['./src/web/app.ts', './src/web/styles.css'],
    output: {
        filename: '[name].[contenthash].js',
        path: buildPath,
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/web/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                resourceQuery: /raw/,
                type: 'asset/source'
            },
            {
                resourceQuery: /template/,
                loader: 'html-loader'
            }
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true
          }),
          new CssMinimizerPlugin()
        ]
      }
};
