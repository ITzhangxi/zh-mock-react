import { contentClient } from '../utils';

document.addEventListener('DOMContentLoaded', function () {
  injectJsToDom('inject/index.js');
});

function injectJsToDom(path) {
  // 这里必须是 index.js 而不是 index.ts
  // 主要原因是因为，谷歌拓展加载的是编译后的代码，inject/index.ts是编译前的代码
  path = path || 'inject/index.js';
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL(path);
  document.body.appendChild(script);
}

contentClient.listen('refresh page', (_res, sendResponse) => {
  sendResponse('received refresh cmd');
  setTimeout(() => {
    window.location.reload();
  }, 500);
});
