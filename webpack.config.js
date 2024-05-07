const path = require("path");
const packageJson = require("./package.json");
const { DefinePlugin } = require("webpack"); //to access built-in plugins

const snakeToCamel = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    );
const libName = snakeToCamel(packageJson.name);

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    clean: true,
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "this",
    library: {
      name: libName,
      type: "umd",
    },
  },
  plugins: [
    new DefinePlugin({
      "process.env.LIB_NAME": JSON.stringify(libName),
    }),
  ],
};
