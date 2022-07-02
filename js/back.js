const header = document.getElementsByTagName('header')[0]

var back_route = "/"

switch (window.location.href.split("/")[3]) {
    case "contacts":
        back_route = "/contacts"
        break;
    default:
        back_route = "/"
        break;
}

header.innerHTML = `
<div class="filler" style="height:10vh; width:100%;"></div>
<nav class="navbar bg-light fixed-top" style="height:10vh; width:100%;">
    <div class="container-fluid">
        <a class="navbar-brand" href="${back_route}">
        <svg xmlns="http://www.w3.org/2000/svg" style="margin-left:20px;" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        </a>
        
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Options</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        </div>
    </div>
</nav> 
`