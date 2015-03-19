// TODO 1.jqueryとvanilaが混在しているのでどちらかに統一すること
// TODO 2.setTimeoutの撲滅

function deleteNotify() {
  var aWin = null;

  // 通知全件削除アイコンを追加 
  var element = document.createElement('span'); 
  element.id = "appmenu-notifyDelete"; 
  element.className = "appmenu-item"; 
  element.innerHTML = "<div class=\"icon-appMenu-notification appmenu-item-icon\"></div><div><nobr>通知全件削除</nobr></div>"; 
  var objBody = document.getElementsByClassName("application_menu").item(0);
  objBody.appendChild(element); 

  document.getElementById( "appmenu-notifyDelete" ).onclick = function () {
    var URL="";
    function getNotifyURL(){
      var storageURL = "";
      var dfd = $.Deferred();
      // ローカルストレージを取得するメッセージをbackground側に送信し設定値を取得する。
        chrome.runtime.sendMessage(
          {action: "getLocalStorage"}, function(response) {
            if (response["URL"]) {
              storageURL = response["URL"];
              URL = "https://" +  storageURL +".cybozu.com/g/notification/index.csp?"
              dfd.resolve();
            } else {
              alert('設定＞その他のツール＞拡張機能からNotifyDeleteのオプションにて設定を済ませて下さい。')
            }
          })
      return dfd.promise();
    }

    function deleteAllNotify(){
      aWin = window.open( URL, null,"alwayslowered=yes,left=800");
      window.focus();
      var d = new $.Deferred();
      aWin.onload = function(){
             // 通知一覧にチェック
              aWin.document.getElementsByClassName('check_button')[0].click();

              // 確認済みにするを押下
              aWin.document.getElementsByClassName('list_menu_item')[1].children[0].click();

              // ここでAjax通信を監視することが出来るのか？出来るのであればsetTimeoutを除去したいが…。
              setTimeout(function(){ d.resolve() }, 1000);
        };

      d.promise().done(function(){
          aWin.close();
          document.getElementById( "cloudHeader-grnNotificationTitle-grn" ).click();
        });
    }

    getNotifyURL().done(deleteAllNotify);

   };
};

deleteNotify();
