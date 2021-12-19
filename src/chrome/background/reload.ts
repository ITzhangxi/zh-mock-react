import { reloadEvent } from '../utils/reloadEvent';
import { backgroundClient, ChromeMessage, reload } from '../utils';

reloadEvent(() => {
  reload();
  // chrome.tabs.query({ active: true }, async (tabs) => {
  //   if (tabs.length > 0) {
  //     const res = await backgroundClient.seedMessage(new ChromeMessage('refresh page'));
  //     if (res) {
  //       reload();
  //     }
  //   }
  // });
});
