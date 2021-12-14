import paths from './paths';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { HtmlWebpackPluginOptions } from './config';

const config = {
  entry: {
    panel: paths.panelTsx,
    popup: paths.popupTSX,
    background: paths.backgroundTSX,
    devtools: paths.devtoolsTS,
  },
  resolve: {
    alias: {
      panel: paths.panel,
      popup: paths.popup,
      background: paths.background,
      devtools: paths.devtools,
    },
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        { HtmlWebpackPluginOptions },
        {
          chunks: ['popup'],
          template: paths.popupHtml,
          filename: 'popup/index.html',
        }
      )
    ),
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
          chunks: ['background'],
          template: paths.backgroundHtml,
          filename: 'background/index.html',
        }
      )
    ),
    new HtmlWebpackPlugin(
      Object.assign(
        { HtmlWebpackPluginOptions },
        {
          chunks: ['devtools'],
          template: paths.devtoolsHtml,
          filename: 'devtools/index.html',
        }
      )
    ),
  ],
};
export default config;
