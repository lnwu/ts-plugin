import path from "path";

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "out.js",
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }],
  },
};
