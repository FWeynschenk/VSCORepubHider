chrome.runtime.onInstalled.addListener(() => {
  badgeOn();

  // reload vsco pages to inject content script
  chrome.tabs.query({ url: "https://vsco.co/*" }, function (tabs) {
    tabs.forEach(tab => {
      chrome.tabs.reload(tab.id);
    });
  });
});

// toggle hide republishes
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get(["hideRepublishes"], function (result) {
    if (result.hideRepublishes) {
      badgeOff();
      chrome.tabs.query({ url: "https://vsco.co/*" }, function (tabs) {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { message: 'unHide' });
        });
      });
    } else {
      badgeOn();
      chrome.tabs.query({ url: "https://vsco.co/*" }, function (tabs) {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { message: 'hide' });
        });
      });
    }
  });
});


function badgeOn() {
  chrome.storage.local.set({ "hideRepublishes": true });
  chrome.action.setBadgeBackgroundColor({ color: 'green' });
  chrome.action.setBadgeText({ text: 'on' });
}

function badgeOff() {
  chrome.storage.local.set({ "hideRepublishes": false });
  chrome.action.setBadgeBackgroundColor({ color: 'red' });
  chrome.action.setBadgeText({ text: 'off' });
}