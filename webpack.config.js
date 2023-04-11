const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const buildPath = path.resolve(__dirname, "docs");

module.exports = {
  entry: ["./src/web/app.ts", "./src/web/styles.css"],
  output: {
    filename: "[name].[contenthash].js",
    path: buildPath,
    clean: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/web/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(__dirname, "docs/**/*.js"),
        path.join(
          __dirname,
          "docs/**/*.css",
          path.join(__dirname, "docs/**/*.html")
        ),
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        resourceQuery: /template/,
        loader: "html-loader",
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};
