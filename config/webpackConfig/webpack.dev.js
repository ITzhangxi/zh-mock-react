import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import chromeConfig from './webpack.chrome';
import reactConfig from './webpack.react';
import reloadServer from './reloadServer';
import CompilerEmitPlugin from './plugins/CompilerEmitPlugin';
import { serverConfig } from './config';

const config = {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    hot: true,
    host: serverConfig.devHost,
    port: serverConfig.devPort,
    client: {
      progress: true,
      webSocketURL: `ws://${serverConfig.devHost}:${serverConfig.devPort}/ws`,
    },
    // webSocketServer: false,
    devMiddleware: {
      writeToDisk: true,
    },
    webSocketServer: false,
    onAfterSetupMiddleware() {
      reloadServer();
    },
  },
  plugins: [new CompilerEmitPlugin()],
};

export default merge(commonConfig, chromeConfig, reactConfig, config);
