export const pluginName = 'CompilerEmitPlugin';
export default class CompilerEmitPlugin {
  static innerCompiler;

  apply(compiler) {
    CompilerEmitPlugin.innerCompiler = compiler;
  }
}
