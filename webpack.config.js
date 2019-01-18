const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonConfig = {
  resolve: {
    extensions: ['.js']
  },
  externals: {
    sqlite3: 'commonjs sqlite3',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devtool: 'inline-source-map',
  node: {
    __dirname: false
  },
  stats: {//FIXED: https://github.com/jantimon/html-webpack-plugin/issues/895
    children: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      // {  //TODO: maybe need to remove
      //   test: /\.node$/,
      //   use: 'node-loader'
      // },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /tar[\\/].*\.js$/,
        loader: 'babel-loader!octal-number-loader' //FIXED: https://github.com/googleapis/google-cloud-node/issues/1821#issuecomment-282507932
      },
      {
        type: 'javascript/auto',  //FIXED: https://github.com/webpack/webpack/issues/6586#issuecomment-368677035
        test: /\.json$/i,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = [
  Object.assign(
    {
      target: "electron-main",
      entry: { main: "./src/main.js" },
      plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "index.html",
          inject: false //FIXED: https://github.com/petehunt/webpack-howto/issues/46#issuecomment-164285430
        })
      ]
    },
    commonConfig
  ),
  Object.assign(
    {
      target: "electron-renderer",
      entry: {
        index: "./src/ui/index.jsx",
        MainWindows: "./src/ui/MainWindows.jsx",
        Clipboard: "./src/util/clipboard/Clipboard.js"
      }
    },
    commonConfig
  )
];