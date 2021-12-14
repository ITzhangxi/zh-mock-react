import ChromeReloadPlugin from './plugins/CompilerEmitPlugin';
import SSEStream from 'ssestream';

export default function reloadServer(app) {
  app.get('/reload', (req, res, next) => {
    const sseStream = new SSEStream(req);
    const compiler = ChromeReloadPlugin.innerCompiler;
    sseStream.pipe(res);

    let closed = false;

    const reloadPlugin = () => {
      if (!closed) {
        sseStream.write(
          {
            event: 'compiled successfully',
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

    if (compiler && compiler.hooks) compiler.hooks.done.tap('chrome reload plugin', reloadPlugin);

    res.on('close', () => {
      closed = true;
      sseStream.unpipe(res);
    });

    next();
  });
}
