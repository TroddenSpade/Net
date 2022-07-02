// get url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const header = document.getElementsByTagName('header')[0]
const message = document.getElementById('message')
const messages = document.getElementById('messages')
const send = document.getElementById('send')

function scroll(){
    let idx = document.getElementsByClassName('message-box').length-1
    if(idx >= 0){
        let last_element = document.getElementsByClassName('message-box')[document.getElementsByClassName('message-box').length-1]
        last_element.scrollIntoView();
    }
}

var back_route = "/"

switch (window.location.href.split("/")[3]) {
    case "contacts":
        back_route = "/contacts"
        break;
    default:
        back_route = "/"
        break;
}

var len = 0
var h = false
var last_seen = false

function getRoom(id){
    return axios.post('http://localhost/project/room.php', {id, token: localStorage.getItem('token')})
        .then(async res => {
            let do_update = false
            let seen = false
            if(res.data.list.length > 0){
                seen = res.data.list[res.data.list.length-1].is_read == "1"
                if(seen && !last_seen)
                do_update = true
            }
            if(len != res.data.list.length || do_update){
                len = res.data.list.length
                last_seen = seen
                update(res.data.list, res.data.user)
            }
            if(!h){
                createHeader(res.data.user)
            }
            return res.data
        })
        .catch(err => {
            console.log(err)
            alert('Something went wrong. Reload the page and try again.')
            return NaN
        })
}

var data = await getRoom(urlParams.get('room'));
setInterval(async () => {
    data = await getRoom(urlParams.get('room'));
}, 2000);

function createBox(message, user, is_mine, is_sent, is_read = false) {
    let date = new Date(message.date)
    return `<div class="message-lane ${is_mine ? 'right' : 'left'}">
                ${is_mine ? 
                    ""
                : `<div class="image-box"><img src=${'http://localhost/project/pics/' + user.pic}></div>` }
                <div class="message-box ${is_mine ? 'blue': 'white'}">
                    <p class="message-box-text">
                        ${message.body}
                    </p>
                    <div class="icon">
                    ${is_mine ?
                        `${is_sent ? 
                            `${is_read ?
                                `
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                                </svg>
                                `
                                :
                                `
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                `
                            }`
                            : 
                            `
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            ` 
                        }`
                        :
                        ""
                    }
                        <div class="date">${
                            function a(x){return (x.slice(0, -6) + " " + x.slice(8))}(date.toLocaleTimeString())
                        }</div>
                        
                    </div>
                </div>
            </div>`
}

function update(list, user){
    console.log(list, user)
    messages.innerHTML = "<div class=\"fix\"></div>"
    let date = 0
    list.forEach(element => {
        if(element.date.slice(0, 10) != date){
            messages.innerHTML += createLabel(element.date.slice(0, 10))
            date = element.date.slice(0, 10)
        }
        messages.innerHTML += createBox(element, user, element.sender != user.id, true, element.is_read == "1")
    });
    scroll()

    // messages.scrollTo(0, document.body.scrollLeft);
}

function createLabel(datestr){
    return  `<div class="message-lane middle">
                <div class="message-box grey">
                    <div class="icon">
            
                        <div class="date">${
                            datestr
                        }</div>
                        
                    </div>
                </div>
            </div>`
}

function createHeader(user){
    header.innerHTML = `
    <div class="filler" style="height:10vh; width:100%;"></div>
    <nav class="navbar bg-light fixed-top" style="height:10vh; width:100%;">
        <div class="container-fluid" style="justify-content: flex-start">
            <a class="navbar-brand" href="${back_route}">
            <svg xmlns="http://www.w3.org/2000/svg" style="margin-left:20px;" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            </a>
            
            <div class="navbar-brand">
                <div class="head-container">
                    <div class="image">
                        <img src="${'http://localhost/project/pics/' + user.pic}" alt="${user.name}">
                    </div>
                    <div class="info">
                        <h5>${user.name}</h5>
                        <h6>@${user.username}</h6>
                    </div>
                </div>
            </div>
        </div>
    </nav> 
    `
}

function sendMessage(){
    if(message.value != ""){
        axios.post('http://localhost/project/message.php', {
            token: localStorage.getItem('token'),
            room: data.user.id,
            message: message.value
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            alert('Something went wrong. Reload the page and try again.')
        })
        messages.innerHTML += createBox({
            body: message.value,
            date: Date.now()
        }, true, true)

        scroll()
        message.value = ""
    }
    send.blur()

}

send.addEventListener('click', sendMessage)

