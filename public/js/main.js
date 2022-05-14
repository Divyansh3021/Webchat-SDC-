const chatform = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomname = document.getElementById('room-name');
const userList = document.getElementById("users");

const socket = io();

//Get Username and room from URL
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});

//Join Room
socket.emit("joinroom", {username, room})

//Get room and users
socket.on("roomUsers", ({room, users})=>{
    outputRoomName(room);
    outputUsers(users);
})
console.log(username, room);

//Message from server
socket.on('message', message => {
    outputMessage(message);
    console.log(message);
    
    //auto scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatform.addEventListener("submit", (e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit("chatMessage", msg)
    document.getElementById("msg").value = "";
    // right();
})


//Output message to DOM
function outputMessage(message){
    const div = document.createElement("div");
    // div.classList.add("message");
    div.style.width = "100%";
    // div.classList.add(username);
    // div.classList.add(message.position);
    div.innerHTML = `<div style="display:flex; flex-direction: column; width: 30%; float: left;" class="message ${username}"><p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p></div>`;
    console.log(username)
    document.querySelector(".chat-messages").appendChild(div);
    // console.log("running right")
    // arr = document.getElementsByClassName(message.username)

    list = document.querySelectorAll(`div.${message.username}`)
    console.log("query",list)
    // console.log("Array",arr)
    for (let i = 0; i < list.length; i++) {
        // list[i].style.right = "0px";
        list[i].style.float = "right";
        console.log("run")
    }
}

//Add roomname to DOM
function outputRoomName(room){
    roomname.innerText = room;
}

function outputUsers(users){
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}`
}


function right(){
console.log("running right")
arr = document.getElementsByClassName(username)
console.log(arr)
for (let i = 0; i < arr.length; i++) {
    arr[i].style.float = "right";
}
}