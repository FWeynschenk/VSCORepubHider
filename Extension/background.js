chrome.runtime.onInstalled.addListener(() => {

  chrome.storage.local.set({ "hideRepublishes": true });
  chrome.action.setBadgeBackgroundColor({ color: 'green' });
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.tabs.query({ url: "https://vsco.co/*" }, function (tabs) {
    tabs.forEach(tab => {
      chrome.tabs.reload(tab.id);
    });
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get(["hideRepublishes"], function (result) {
    if (result.hideRepublishes) {
      chrome.storage.local.set({ "hideRepublishes": false });
      chrome.action.setBadgeText({ text: 'OFF' });
      chrome.action.setBadgeBackgroundColor({ color: 'red' });
      chrome.tabs.query({ url: "https://vsco.co/*" }, function (tabs) {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { message: 'unHide' });
        });
      });
    } else {
      chrome.storage.local.set({ "hideRepublishes": true });
      chrome.action.setBadgeText({ text: 'ON' });
      chrome.action.setBadgeBackgroundColor({ color: 'green' });
      chrome.tabs.query({ url: "https://vsco.co/*" }, function (tabs) {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { message: 'hide' });
        });
      });
    }
  });
});