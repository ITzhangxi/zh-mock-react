import paths from './paths';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { HtmlWebpackPluginOptions } from './config';
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
            before: [ReactRefreshTypeScript()], // only dev
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
    new ReactRefreshWebpackPlugin(), // HMR in dev
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'jsx', 'js'],
      exclude: ['node_modules', 'chromeExtension'],
      fix: true, // can fix pretties error HMR
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new HtmlWebpackPlugin(
      Object.assign(
        { HtmlWebpackPluginOptions },
        {
          chunks: ['panel'],
          template: paths.panelHtml,
          filename: 'panel/index.html',
        }
      )
    ),
    new HtmlWebpackPlugin(
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
export default config;
