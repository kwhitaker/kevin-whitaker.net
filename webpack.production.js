const merge = require("webpack-merge");
const fs = require("fs");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackOnBuildPlugin = require("on-build-webpack");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  devtool: "source-map",
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new WebpackOnBuildPlugin(() => {
      fs.writeFile("./build/CNAME", "kevin-whitaker.net", err => {
        if (err) {
          throw err;
        }

        console.log("Wrote CNAME");
      });
    })
  ]
});
