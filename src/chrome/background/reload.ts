import { backgroundClient, ChromeMessage, reload } from '../utils';

// const eventSource = new EventSource('http://localhost:9080/reload/');
// eventSource.addEventListener('compiled successfully', () => {
//   console.log('compiled successfully');

//   chrome.tabs.query({ active: true }, async (tabs) => {
//     if (tabs.length > 0) {
//       const res = await backgroundClient.seedMessage(new ChromeMessage('refresh page'));
//       if (res) {
//         reload();
//       }
//     }
//   });
// });
