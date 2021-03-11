// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    databaseURL: "",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// MSG送受信準備
var newPostRef = firebase.database().ref();

// Submit:MSG送受信準備
$(function(){
    today = new Date();
    mon = today.getMonth() + 1;
});

//アイコン使用
var d = 0;
const img = ["cure_blossom.png", "cure_happy.png", "cure_marin.png","cure_beauty.png", "cure_sunshine.png", "cure_peace.png"]
$(".icon").on("click", function(){
    d = $(this).attr("data-img")
});
// 送信処理(ボタンをクリック)
$("#send").on("click", function(){
    var now = new Date();
    newPostRef.push({
        username: $("#username").val(),
        text: $("#text").val(),
        date: now.getFullYear() + "-" + mon + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
        icon: d
    });
    $("#text").val("");    
});
// 送信処理2(メッセージ欄でエンターキー)
$("#text").on("keydown",function(event){
    var now = new Date();
    if(event.keyCode==13){
        newPostRef.push({
        username: $("#username").val(),
        text: $("#text").val(),
        date: now.getFullYear() + "-" + mon + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
        icon: d
    });
    $("#text").val("");
    }
});

// MSGデータ受信
// child_added:毎回1回//value:毎回全てのデータを取得
newPostRef.on("child_added", function(data){
    const v = data.val(); //データ取得
    const k = data.key; //ユニークKEY取得
    var str = `<img src='img/${img[v.icon]}' width="80" height="80">`;
    str += '<div id="name" style="color:white">'+v.username+'さん</div>';
    str += '<br><div id="text" style="color:#8276ff">'+v.text+'</div>';
    str += '<br><br><div id="day">'+v.date+'</div><hr>';
    $("#output").append(str);
});

// 画像投稿(未完成)
// document.getElementById('upload').addEventListener('click', function() {
//     files = document.getElementById('file').files;
//     image = files[0];
//     if(files[0].type.indexOf('image') >= 0) {
//     ref = firebase.storage().ref().child(image.name);
//     ref.put(image).then(function(snapshot) {
//     ref.getDownloadURL().then(function(url){
//     alert('画像をアップロードしました');
//     document.getElementById('image').src = url;
//     });
//     });
//     } else {
//     alert('アップロードできるのはjpeg、png、gifの画像だけです');
//     }
//     });
//     document.getElementById('delete').addEventListener('click', function() {
//     ref.delete().then(function(){
//     alert('画像を削除しました');
//     });
//     });
