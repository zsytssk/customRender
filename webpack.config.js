"use strict";
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(.*)?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist")
  }
};
