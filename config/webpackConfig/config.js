export const HtmlWebpackPluginOptions = {
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

export const serverConfig = {
  reloadPort: 62222,
  reloadHost: 'localhost',
  reloadEvent: 'server-reload',
  devPort: 61111,
  devHost: 'localhost',
  progress: true,
};
