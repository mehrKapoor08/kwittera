const firebaseConfig = {
    apiKey: "AIzaSyBb66-5sXZQCcuh5NRO6YNe7YcAqzWtZgs",
    authDomain: "kwitter-236a8.firebaseapp.com",
    projectId: "kwitter-236a8",
    storageBucket: "kwitter-236a8.appspot.com",
    messagingSenderId: "952681742038",
    appId: "1:952681742038:web:68c1ab19ac554c46f81377",
    databaseURL: "https://kwitter-236a8-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("userName");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name: username,
          message: msg,
          like: 0
    });

    document.getElementById("msg").value = "";

}


function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message= message_data['message'];
like=message_data['like'];
nameWithTag="<h4>"+ name +"<img class='userTick' src='tick.png'> </h4> ";
messageWithTag="<h4 class='messageh4' > "+message+ "</h4>";

likeButton ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
spanWithTag="<span class='glyphicon glyphicon-thumbs-up'>Like:  " +like+ "</span> </button> <hr>";

row= nameWithTag+ messageWithTag+ likeButton+spanWithTag;
document.getElementById("output").innerHTML+=row;
                }
          });
    });
}
getData();


function updateLike(messageId){

    console.log("clicked on the like button:" +messageId);
    buttonId=messageId;
    likes= document.getElementById(buttonId).value;
    updatedLikes= Number(likes)+1;


    firebase.database().ref(room_name).child(messageId).update({
          like: updatedLikes
    });
}

function logout(){
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName")
    window.location.replace("kwitter.html");
}