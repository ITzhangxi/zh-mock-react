import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import chromeConfig from './webpack.chrome';
import reactConfig from './webpack.react';

const config = {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 9090,
    client: {
      progress: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
};

export default merge(commonConfig, chromeConfig, reactConfig, config);
