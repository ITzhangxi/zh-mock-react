export default [
  {
    input: 'config/webpackConfig/webpack.common.js',
    output: {
      file: 'config/webpack.common.js',
      format: 'cjs',
    },
  },
  {
    input: 'config/webpackConfig/webpack.dev.js',
    output: {
      file: 'config/webpack.dev.js',
      format: 'cjs',
    },
  },
];
