const path = require("path");
const webpackMerge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base");

const config = {
  entry: "./app/client/src/client.js",
  output: {
    path: path.join(__dirname, "app", "public"),
    filename: "index_bundle.js"
  }
};

module.exports = webpackMerge(config, webpackBaseConfig);
