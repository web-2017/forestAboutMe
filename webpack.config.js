const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const PATHS = {
  source: path.join(__dirname, "source"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  //функция которая возвращает следить или нет в зависимости от глобальной переменной NODE_ENV, которая устанавливается в scripts npm
  watch: (function() {
    return process.env.NODE_ENV === "development";
  })(),

  entry: {
    index: "./app/pages/index/index.js",
    about: "./app/pages/about/about.js",
    blog: "./app/pages/blog/blog.js",
    works: "./app/pages/works/works.js",
    webgl: "./app/js_modules/water.js",
    admin: "./app/pages/admin/admin.js"
  },
  devtool: "inline-source-map", // any "source-map"-like devtool is possible
  output: {
    path: PATHS.dist,
    filename: "./js/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,

        loader: "babel-loader"
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          publicPath: "../",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: "../",
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: [
              "vue-style-loader",
              "css-loader",
              "sass-loader",
              {
                loader: "sass-resources-loader",
                options: {
                  // Or array of paths
                  resources: [
                    "./app/sass/_variables.scss",
                    "./app/sass/_mixin.scss"
                  ]
                }
              }
            ],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax",
              "sass-resources-loader",
              {
                loader: "sass-resources-loader",
                options: {
                  // Or array of paths
                  resources: [
                    "./app/sass/_variables.scss",
                    "./app/sass/_mixin.scss"
                  ]
                }
              }
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      }
    ]
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "./app/vue/styles/")
    }
  },
  plugins: [
    new CleanWebpackPlugin("dist"),
    new HtmlWebpackPlugin({
      filename: "index.html",
      // указываем подключаемый budle
      chunks: ["index", "common", "webgl"],
      inject: "head",
      template: "./app/pug/pages/index.pug"
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      chunks: ["about", "common"],
      inject: "head",
      template: "./app/pug/pages/about.pug"
    }),
    new HtmlWebpackPlugin({
      filename: "blog.html",
      chunks: ["blog", "common"],
      inject: "head",
      template: "./app/pug/pages/blog.pug"
    }),
    new HtmlWebpackPlugin({
      filename: "works.html",
      chunks: ["works", "common"],
      inject: "head",
      template: "./app/pug/pages/works.pug"
    }),
    new HtmlWebpackPlugin({
      filename: "admin.html",
      chunks: ["admin", "common"],
      inject: "body",
      template: "./app/pug/pages/admin.pug"
    }),
    new ExtractTextPlugin("./css/[name].css"),
    new ScriptExtHtmlWebpackPlugin({
      defer: "webgl"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    }),
    new webpack.ProvidePlugin({
      identifier: "./app/js_modules/map.js"
    }),

    // new OptimizeCssAssetsPlugin({
    //   cssProcessorOptions: { discardComments: { removeAll: true } }
    // }),
    new StyleLintPlugin({
      configFile: "./.stylelintrc"
    })
    // new UglifyJsPlugin()
  ]
};
