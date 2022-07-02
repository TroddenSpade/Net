var chats = document.getElementById('chats')
if(!localStorage.getItem('token')){
    window.location.href = '/login/'
}
var last_date = ""
var last_check = "0"

function getChat(){
    return axios.post('http://localhost/project/chats.php', {token: localStorage.getItem('token')})
        .then(res => {
            if(res.data.data.length != 0 && 
                (res.data.data[0][1].date != last_date || 
                (res.data.data[0][1].sender != res.data.data[0][0].id && last_check != res.data.data[0][1].is_read))){
                chats.innerHTML = ""
                res.data.data.forEach(element => {
                    let message = element[1]
                    let user = element[0]
                    chats.innerHTML += createChat(message, user, message['sender'] != user['id'], message['is_read'] == "1")
                });
                if(last_date != "" && res.data.data[0][1].date != last_date)
                    alert("New message")
                last_date = res.data.data[0][1].date
                last_check = res.data.data[0][1].is_read
            }
            return res.data
        })
        .catch(err => {
            console.log(err)
            alert('Something went wrong. Reload the page and try again.')
            return NaN
        })
}

let data = await getChat()

setInterval(async () => {
    data = await getChat();
}, 2000);


function createChat(message, user, is_mine, is_read = false) {
    return `<a class="message-lane" href="/chat/index.html?room=${user.id}">
                <div class="img" >
                    <img src="${'http://localhost/project/pics/' + user.pic}" alt="">
                </div>
                <div class="info">
                    <div class="top">
                        <h6 class="name">${user.name}</h6>
                        <div class="right1">
                            <div class="ymd">
                                ${message.date.split(' ')[0].slice(0, 10)}
                            </div>
                            <div class="hms">
                                ${message.date.split(' ')[1].slice(0, 5)}
                            </div>
                            ${is_mine ? 
                                `<div class=\"icon\">
                                    ${is_read ? 
                                        `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                                        </svg>`
                                        :
                                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                        </svg>`
                                    }
                                </div>`
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div class="bottom">
                        <p class="message">${message.body}</p>
                        <div class="right2">
                            <div class="icon">
                            ${(!is_mine && !is_read) ?
                                `
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                </svg>
                                `
                                :
                                ""
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </a>`
}