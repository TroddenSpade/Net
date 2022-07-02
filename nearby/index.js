var contacts = document.getElementsByClassName('contacts')[0]

function get_contacts(){
    axios.post('http://localhost/project/users.php', {token: localStorage.getItem('token')})
    .then(function(response){
        console.log(response.data);
        list = response.data.list

        list.forEach(element => {
            console.log(element)
            contacts.innerHTML += 
            `
            <a class="contact" href="/chat/index.html?room=${element.id}">
                <div class="image">
                    <img src="${'http://localhost/project/pics/' + element.pic}" alt="">
                </div>
                <div class="info">
                    <h5 class="name">${element.name}</h5>
                    <div class="username">@${element.username}</div>
                </div>
                <div class="msg">
                    <p>Click to Chat!</p>
                </div>
            </a>
            `
        });
    })
    .catch(function(error){
        console.log(error);
    })
}

get_contacts()