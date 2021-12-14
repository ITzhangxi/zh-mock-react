import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import chromeConfig from './webpack.chrome';
import reactConfig from './webpack.react';
import reloadServer from './reloadServer';

const config = {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 9080,
    client: {
      progress: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
    onBeforeSetupMiddleware({ app }) {
      reloadServer(app);
    },
  },
};

export default merge(commonConfig, chromeConfig, reactConfig, config);
