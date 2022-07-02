const header = document.getElementsByTagName('header')[0]

import {autoSignin} from './login.js'


var data = await autoSignin()

console.log(data)

if(data.login_state){
    var route = window.location.href.split("/")[3]
    console.log(route)
    
    let active = 0
    switch(route){
        case '' || 'index.html':
            active = 0
            break
        case 'contacts':
            active = 1
            break
        case 'nearby':
            active = 2
            break
        case 'settings':
            active = 3
            break
    }

    header.innerHTML = `
    <div class="filler" style="height:10vh; width:100%;"></div>
    <nav class="navbar bg-light fixed-top" style="height:10vh; width:100%;">
        <div class="container-fluid">
            <a class="navbar-brand" href="/" style="color: #00bfff; ">Messanger</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header" style="background-color: #00bfff; ">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Options</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div style="width: 100%;height: 150px;padding: 20px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
                <div style="margin: 10px;">
                    <img src="${data.user.pic}" alt="${data.user.name}" class="img-fluid rounded-circle" style="width: 100px; height: 100px;">
                </div>
                <div style="margin:10px">
                    <h5 style="font-weight:bold;">${data.user.name}</h5>
                    <h6 style="color: grey; margin:0">@${data.user.username}</h6>
                    <h6 style="color: grey; margin:0; margin-top:5px">${data.user.number}</h6>
                </div>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <a class="nav-link ${active==0 ? "active" : ""}" aria-current="page" href="/">Chats</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${active==1 ? "active" : ""}" href="/contacts">Contacts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${active==2 ? "active" : ""}" href="/nearby">Nearby People</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${active==3 ? "active" : ""}" href="/settings">Settings</a>
                </li>
                <li class="nav-item" style="margin-top:20px;">
                    <button class="btn btn-danger" id="logout">Logout</button>
                </li>
                </ul>
            </div>
            </div>
        </div>
    </nav> 
    `
}else{

    header.innerHTML = `
    <div class="filler" style="height:10vh; width:100%;"></div>
    <nav class="navbar bg-light fixed-top" style="height:10vh; width:100%;">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Messanger</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Options</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/login">Login</a>
                </li>
                </ul>
            </div>
            </div>
        </div>
    </nav> 
    `
}

const logout = document.getElementById('logout')

const logoutFn = () => {
    console.log('logout')
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    window.location.href = '/login'
}

if(logout){
    logout.addEventListener('click', logoutFn)
}
