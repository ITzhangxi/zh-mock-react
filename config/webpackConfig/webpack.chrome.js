import paths from './paths';

const config = {
  entry: {
    background: paths.backgroundTS,
    content_script: paths.content_scriptTS,
    devtools: paths.devtoolsTS,
  },
  resolve: {
    alias: {
      background: paths.background,
      content_script: paths.content_script,
      devtools: paths.devtools,
    },
  },
};
export default config;
