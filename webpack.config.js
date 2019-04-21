const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");

var config = {
  output: {
    path: path.resolve(__dirname + "/dist/")
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue"
      },
      {
        test: /\.css$/,
        loader: "style!less!css"
      }
    ]
  },
  externals: {
    moment: "moment",
    element: "element-ui"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ],
  resolveLoader: {
    moduleExtensions: ["-loader"]
  }
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + "/src/plugin.js"),
    output: {
      filename: "vue-calendar-schedule.min.js",
      libraryTarget: "window",
      library: "VueCalendarSchedule"
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + "/src/VueCalendarSchedule.vue"),
    output: {
      filename: "vue-calendar-schedule.js",
      libraryTarget: "umd",
      library: "vue-calendar-schedule",
      umdNamedDefine: true
    }
  })
];
// "build": "node build/build.js"
