const merge = require("webpack-merge");
const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackOnBuildPlugin = require("on-build-webpack");
const baseConfig = require("./webpack.config");

const otherProjects = [
  {
    dest: "./build/toa-travel",
    path: path.join(__dirname, "..", "toa-travel", "build"),
    name: "TOA Travelogue"
  },
  {
    dest: "./build/chargen",
    path: path.join(__dirname, "..", "chargen-js", "build"),
    name: "Character Generator"
  }
];

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

      otherProjects.forEach(({ dest, path, name }) => {
        fs.pathExists(path).then(exists => {
          if (!exists) {
            return console.log(`${name} does not exist!`);
          }

          fs
            .copy(path, dest)
            .then(() => console.log(`Copied ${name}`))
            .catch(err => console.error(err));
        });
      });
    })
  ]
});
