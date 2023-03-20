const socket = io();
let nam;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.mssg')
do {
    nam = prompt('Please enter your name: ')
    console.log(nam);
} while(!nam)
textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter')
    {
        sendMessage(e.target.value);
    }
})
function sendMessage(message) {
    let msg = {
        user: nam,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollbottom()
    // scrollToBottom()

    // Send to server 
    // socket.emit('message', msg)
    //send messsage to the server
    socket.emit('message',msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}
// recieve the message from server
socket.on('message',(msg)=>{
  appendMessage(msg,'incoming');
  scrollbottom()
// console.log(msg);

 })
 function scrollbottom(){
    messageArea.scrollTop=messageArea.scrollHeight
 }




