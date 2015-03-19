$(function(){

  // セーブボタンが押されたら、
  // ローカルストレージに保存する。
  $("#save").click(function () {
    localStorage["URL"] = $("#URL").val();
  });

  // オプション画面の初期値を設定する
  if (localStorage["URL"]) {
    $("#URL").val(localStorage["URL"]);
  }
});