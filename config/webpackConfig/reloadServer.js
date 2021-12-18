import { serverConfig } from './config';
import ChromeReloadPlugin, { pluginName } from './plugins/CompilerEmitPlugin';
import express from 'express';
import SSEStream from 'ssestream';

const reloadServer = () => {
  const app = express();
  app.get('/reload', (req, res) => {
    res.set({
      'Access-Control-Allow-Credentials': true, //允许后端发送cookie
      'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS', //允许支持的请求方式
      'Content-Type': 'application/json; charset=utf-8', //默认与允许的文本格式json和编码格式
    });
    const sseStream = new SSEStream(req);

    sseStream.pipe(res);
    const compiler = ChromeReloadPlugin.innerCompiler;
    let closed = false;

    const reloadPlugin = () => {
      if (!closed) {
        sseStream.write(
          {
            event: serverConfig.reloadEvent,
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

    if (compiler) {
      if (compiler.hooks) {
        compiler.hooks.done.tap(pluginName, () => setTimeout(() => reloadPlugin(), 500));
      } else {
        compiler.plugin('done', () => setTimeout(() => reloadPlugin(), 500));
      }
    }
  });
  app.listen(serverConfig.reloadPort, (err) => {
    if (err) throw err;
    console.log(`reload server ready on http://localhost:${serverConfig.reloadPort}`);
  });
};

export default reloadServer;
