const socket = io();
var name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        sendMessage(e.target.value)
        e.target.value = ''; // Clear the textarea after sending the message
    }
});


function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append
    appendMessage(msg, 'outgoing')
    scrollToBottom();

    //Send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type){
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

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom();
})

function scrollToBottom(){  
    messageArea.scrollTop = messageArea.scrollHeight
}