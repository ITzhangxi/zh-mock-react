import child_process from 'child_process';
const pluginName = 'CopyManifestWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  manifest;
  icon;
  constructor(props) {
    this.manifest = props.manifest;
    this.icon = props.icon;
    this.locales = props.locales;
  }
  apply(compiler) {
    const copy = () => {
      if (this.manifest) child_process.exec(`cp -f ${this.manifest} chromeExtension`);
      if (this.icon) child_process.exec(`cp -f ${this.icon} chromeExtension`);
      if (this.locales) child_process.exec(`cp -rf ${this.locales} chromeExtension`);
    };
    if (compiler.hooks) {
      compiler.hooks.done.tap(pluginName, copy);
    } else {
      compiler.plugin('done', copy);
    }
  }
}

export default ConsoleLogOnBuildWebpackPlugin;
