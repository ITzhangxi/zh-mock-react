import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import chromeConfig from './webpack.chrome';
import reactConfig from './webpack.react';
import reloadServer from './reloadServer';
import CompilerEmitPlugin from './plugins/CompilerEmitPlugin';

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
      webSocketURL: 'ws://localhost:9080/ws',
    },
    devMiddleware: {
      writeToDisk: true,
    },
    onBeforeSetupMiddleware({ app }) {
      reloadServer(app);
    },
  },
  plugins: [new CompilerEmitPlugin()],
};

export default merge(commonConfig, chromeConfig, reactConfig, config);
