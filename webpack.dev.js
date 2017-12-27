const merge = require("webpack-merge");
const baseConfig = require("./webpack.config");
const webpack = require("webpack");

module.exports = merge(baseConfig, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./build"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
});
