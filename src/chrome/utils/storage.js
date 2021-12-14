export function set(key, value) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      resolve(value);
    });
  });
}

export function get(key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (result) => {
      resolve(result[key]);
    });
  });
}
