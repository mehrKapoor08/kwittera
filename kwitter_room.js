// Your web app's Firebase configuration
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
userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = "Welcome " + userName;
function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;
                console.log("Room Name: " + Room_names);
                row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
                document.getElementById("output").innerHTML += row;
          });
    });
}
getData();
function addRoom() {
    room_name = document.getElementById("add_room").value;
    console.log("room_name"+room_name);
    firebase.database().ref("/").child(room_name).update({
          purpose: "adding room name "
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}
function redirectToRoomName(name){
console.log(name);
localStorage.setItem("room_name", name);
window.location="kwitter_page.html";
}