import child_process from 'child_process';
const pluginName = 'CopyManifestWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    const copy = () => {
      child_process.exec('cp src/manifest.json chromeExtension;cp src/icon.png chromeExtension;');
    };
    if (compiler.hooks) {
      compiler.hooks.done.tap(pluginName, copy);
    } else {
      compiler.plugin('done', copy);
    }
  }
}

export default ConsoleLogOnBuildWebpackPlugin;
