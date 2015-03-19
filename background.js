// ローカルストレージを取得するメッセージを受け付ける
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getLocalStorage"){
    sendResponse(localStorage);
  }
});