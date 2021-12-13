import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

export default {
  // 文件
  panelTsx: resolveApp('src/panel/index.tsx'),
  backgroundTSX: resolveApp('src/background/index.tsx'),
  popupTSX: resolveApp('src/popup/index.tsx'),
  devtoolsTS: resolveApp('src/devtools/index.ts'),
  backgroundTS: resolveApp('src/background/index.ts'),
  content_scriptTS: resolveApp('src/content_script/index.ts'),

  // 文件夹
  src: resolveApp('src'),
  panel: resolveApp('src/panel'),
  background: resolveApp('src/background'),
  content_script: resolveApp('src/content_script'),
  devtools: resolveApp('src/devtools'),
  popup: resolveApp('src/popup'),
  output: resolveApp('chromeExtension'),
  chromeImg: resolveApp('src/img'),

  // html temp
  panelHtml: resolveApp('src/panel/index.html'),
  popupHtml: resolveApp('src/popup/index.html'),
  backgroundHtml: resolveApp('src/background/index.html'),
};
