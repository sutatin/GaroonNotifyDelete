$(function(){

  // セーブボタンが押されたら、
  // ローカルストレージに保存する。
  $("#save").click(function () {
    localStorage["URL"] = $("#URL").val();
    alert($("#URL").val()+"で値が保存されました。");
  });

  // オプション画面の初期値を設定する
  if (localStorage["URL"]) {
    $("#URL").val(localStorage["URL"]);
  }
});