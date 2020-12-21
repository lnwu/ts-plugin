const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    vendor: ["react", "react-dom"],
    app: "./src/example/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx$/, use: "ts-loader" }],
  },
  plugins: [new CleanWebpackPlugin()],
};
