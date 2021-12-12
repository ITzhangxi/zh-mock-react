import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

export default {
  // 文件
  panelTsx: resolveApp('src/panel/index.tsx'),
  popupTSX: resolveApp('src/popup/index.tsx'),
  backgroundTS: resolveApp('src/background/index.ts'),
  content_scriptTS: resolveApp('src/content_script/index.ts'),
  devtoolsTS: resolveApp('src/devtools/index.ts'),

  // 文件夹
  src: resolveApp('src'),
  panel: resolveApp('src/panel'),
  background: resolveApp('src/background'),
  content_script: resolveApp('src/content_script'),
  devtools: resolveApp('src/devtools'),
  popup: resolveApp('src/popup'),
  output: resolveApp('chromeExtension'),

  // html temp
  panelHtml: resolveApp('src/panel/index.html'),
  popupHtml: resolveApp('src/popup/index.html'),
};
