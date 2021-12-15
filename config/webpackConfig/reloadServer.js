import ChromeReloadPlugin, { pluginName } from './plugins/CompilerEmitPlugin';
import SSEStream from 'ssestream';

export default function reloadServer(app) {
  app.get('/reload', (req, res, next) => {
    const sseStream = new SSEStream(req);

    if (!global.resSet.has(res)) {
      res.set('Content-Type', 'text/event-stream');
      global.resSet.add(res);
    }

    sseStream.pipe(res);
    const compiler = ChromeReloadPlugin.innerCompiler;
    let closed = false;

    const reloadPlugin = () => {
      debugger;
      if (!closed) {
        sseStream.write(
          {
            event: 'message',
            data: {
              action: 'reload extension and refresh current page',
            },
          },
          'utf-8',
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );

        setTimeout(() => {
          sseStream.unpipe(res);
        }, 100);
      }
    };
    debugger;

    if (compiler) {
      if (compiler.hooks) {
        compiler.hooks.done.tap(pluginName, reloadPlugin);
      } else {
        compiler.plugin('done', reloadPlugin);
      }
    }

    res.on('close', () => {
      closed = true;
      sseStream.unpipe(res);
    });
    next();
  });
}
