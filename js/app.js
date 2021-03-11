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
$("#send").on("click", function(){
    var now = new Date();
    newPostRef.push({
        username: $("#username").val(),
        text: $("#text").val(),
        date: now.getFullYear() + "-" + mon + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    });
    $("#text").val("");    
});
// 送信処理2
$("#text").on("keydown",function(event){
    // console.log(event);
    if(event.keyCode==13){
        newPostRef.push({
        username: $("#username").val(),
        text: $("#text").val(),
        // date: now.getFullYear() + "-" + mon + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
        });
    $("#text").val("");
    }
});

// MSGデータ受信
// child_added:毎回1回//value:毎回全てのデータを取得
newPostRef.on("child_added", function(data){
    const v = data.val(); //データ取得
    const k = data.key; //ユニークKEY取得
    var str = '';
    str += '<div id="name">'+v.username+'さん</div>';
    str += '<br><div id="text">'+v.text+'</div>';
    str += '<br><br><div id="day">'+v.date+'</div><hr>';
    $("#output").append(str);
});