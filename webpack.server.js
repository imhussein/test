const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const webpackBaseConfig = require("./webpack.base");
const webpackMerge = require("webpack-merge");

const config = {
  entry: "./app/src/index.js",
  output: {
    path: path.join(__dirname, "app", "build"),
    filename: "index_bundle.js"
  },
  externals: [webpackNodeExternals()]
};

module.exports = webpackMerge(config, webpackBaseConfig);
