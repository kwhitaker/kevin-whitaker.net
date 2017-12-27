const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new HtmlWebpackPlugin({
      inject: true,
      template: require("html-webpack-template"),
      title: "Kevin Whitaker | Front-End Developer of Repute",
      baseHref:
        process.env.NODE_ENV === "production"
          ? "http://kevin-whitaker.net"
          : "./",
      googleAnalytics: {
        trackingId: "UA-16736950-1",
        pageViewOnLoad: true
      },
      mobile: true,
      lang: "en-US",
      meta: [
        {
          name: "description",
          content: "Kevin Whitaker's directory or links to stuff he does."
        }
      ]
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  }
};
