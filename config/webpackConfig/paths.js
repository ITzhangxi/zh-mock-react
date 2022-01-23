import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

export default {
  // 文件
  panelTsx: resolveApp('src/chrome/panel/index.tsx'),
  backgroundTSX: resolveApp('src/chrome/background/index.tsx'),
  popupTSX: resolveApp('src/chrome/popup/index.tsx'),
  devtoolsTS: resolveApp('src/chrome/devtools/index.ts'),
  content_scriptTS: resolveApp('src/chrome/content_script/index.ts'),
  manifest: resolveApp('src/chrome/manifest.json'),
  icon: resolveApp('src/chrome/icon.png'),
  linkIcon: resolveApp('src/chrome/icon.ico'),
  injectTS: resolveApp('src/chrome/inject/index.ts'),

  // 文件夹
  src: resolveApp('src'),
  panel: resolveApp('src/chrome/panel'),
  background: resolveApp('src/chrome/background'),
  content_script: resolveApp('src/chrome/content_script'),
  devtools: resolveApp('src/chrome/devtools'),
  popup: resolveApp('src/chrome/popup'),
  output: resolveApp('chromeExtension'),
  chromeImg: resolveApp('src/img'),
  locales: resolveApp('src/chrome/_locales'),
  chrome: resolveApp('src/chrome'),

  // html temp
  panelHtml: resolveApp('src/chrome/panel/index.html'),
  popupHtml: resolveApp('src/chrome/popup/index.html'),
  backgroundHtml: resolveApp('src/chrome/background/index.html'),
  devtoolsHtml: resolveApp('src/chrome/devtools/index.html'),
};
