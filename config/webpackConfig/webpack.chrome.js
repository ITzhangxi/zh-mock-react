import paths from './paths';

const config = {
  entry: {
    background: paths.backgroundTS,
    content_script: paths.content_scriptTS,
    inject: paths.injectTS,
  },
  resolve: {
    alias: {
      background: paths.background,
      content_script: paths.content_script,
      inject: paths.injectTS,
    },
  },
};
export default config;
