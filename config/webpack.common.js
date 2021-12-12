'use strict';

var path = require('path');
var fs = require('fs');
require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var ESLintPlugin = require('eslint-webpack-plugin');
var ReactRefreshTypeScript = require('react-refresh-typescript');
var ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var HtmlWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(HtmlWebpackPlugin);
var ForkTsCheckerWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(ForkTsCheckerWebpackPlugin);
var ESLintPlugin__default = /*#__PURE__*/_interopDefaultLegacy(ESLintPlugin);
var ReactRefreshTypeScript__default = /*#__PURE__*/_interopDefaultLegacy(ReactRefreshTypeScript);
var ReactRefreshWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(ReactRefreshWebpackPlugin);

const appDirectory = fs__default["default"].realpathSync(process.cwd());
const resolveApp = (relativePath) => path__default["default"].resolve(appDirectory, relativePath);

var paths = {
  // 文件
  panelTsx: resolveApp('src/panel/index.tsx'),
  popupTSX: resolveApp('src/popup/index.tsx'),
  backgroundTS: resolveApp('src/background/index.ts'),
  content_scriptTS: resolveApp('src/content_script/index.ts'),
  devtoolsTS: resolveApp('src/devtools/index.ts'),

  // 文件夹
  src: resolveApp('src'),
  panel: resolveApp('src/panel'),
  background: resolveApp('src/background'),
  content_script: resolveApp('src/content_script'),
  devtools: resolveApp('src/devtools'),
  popup: resolveApp('src/popup'),
  output: resolveApp('chromeExtension'),

  // html temp
  panelHtml: resolveApp('src/panel/index.html'),
  popupHtml: resolveApp('src/popup/index.html'),
};

const HtmlWebpackPluginOptions = {
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
  inject: true,
};

// import RUNTIME_CONFIG from './utils/webpack.runtime.config';

const config = {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    panel: paths.panelTsx,
    background: paths.backgroundTS,
    content_script: paths.content_scriptTS,
    devtools: paths.devtoolsTS,
    popup: paths.popupTSX,
  },
  output: {
    filename: (chunkData) => {
      const chunkName = chunkData.chunk.name;
      const name = chunkName.startsWith('runtime-') ? chunkName.substr(8) : chunkName;
      return !name === 'panel' ? `js/${name}.js` : `js/${name}.[contenthash:8].js`;
    },
    path: paths.output,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      panel: paths.panel,
      background: paths.background,
      content_script: paths.content_script,
      devtools: paths.devtools,
      popup: paths.panel,
    },
  },
  devServer: {
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 9090,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        include: paths.src,
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript__default["default"]()], // only dev
          }),
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-proposal-private-methods', { loose: true }],
              ['@babel/plugin-transform-regenerator'],
              require.resolve('react-refresh/babel'),
            ],
          },
        },
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(ico|png|jpg|jpeg|svg|gif)$/,
        include: paths.src,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10240,
          name: 'images/[name]-[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    // new webpack.NormalModuleReplacementPlugin(/\._locale_/, function (resource) {
    //   resource.request = resource.request.replace(/\._locale_/, `.${process.env.LANG_ENV}`);
    // }),
    // new webpack.HotModuleReplacementPlugin(), // with hot is true, we donot need this plugin.
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     ...RUNTIME_CONFIG,
    //   },
    // }),
    new ReactRefreshWebpackPlugin__default["default"](), // HMR in dev
    new ESLintPlugin__default["default"]({
      extensions: ['tsx', 'ts', 'jsx', 'js'],
      exclude: ['node_modules', 'chromeExtension'],
      fix: true, // can fix pretties error HMR
    }),
    new ForkTsCheckerWebpackPlugin__default["default"]({
      async: false,
    }),
    new HtmlWebpackPlugin__default["default"](
      Object.assign(
        { HtmlWebpackPluginOptions },
        {
          chunks: ['panel'],
          template: paths.panelHtml,
          filename: 'panel/index.html',
        }
      )
    ),
    new HtmlWebpackPlugin__default["default"](
      Object.assign(
        { HtmlWebpackPluginOptions },
        {
          chunks: ['panel'],
          template: paths.popupHtml,
          filename: 'popup/index.html',
        }
      )
    ),
  ],
};

module.exports = config;
