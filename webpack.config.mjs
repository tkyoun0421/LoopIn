import path from "path";
import { fileURLToPath } from "url";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "./src/app/entry", "index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@app": path.resolve(__dirname, "src/app"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@widgets": path.resolve(__dirname, "src/widgets"),
        "@features": path.resolve(__dirname, "src/features"),
        "@shared": path.resolve(__dirname, "src/shared"),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
              },
            },
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "[name].js?ver=[hash]",
      filename: "[name].js?ver=[hash]",
      publicPath: "/",
    },
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: isProduction,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/app/public", "index.html"),
      }),
      new Dotenv({
        allowEmptyValues: true,
        systemvars: true,
      }),
    ],
  };
};
