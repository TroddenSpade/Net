// import { autoSignin } from "../js/login"

if(localStorage.getItem('token')){
    window.location.href = '/'
}

var login = true

const signin_form = document.getElementById('signin')
const signup_form = document.getElementById('signup')

signup_form.style.display = 'none'

const change = () => {
    if(login){
        signin_form.style.display = 'none'
        signup_form.style.display = 'block'
    }else{
        signup_form.style.display = 'none'
        signin_form.style.display = 'block'
    }
    login = !login
    
}

const signup = () => {
    const name = document.getElementById('name').value
    const username = document.getElementById('username_1').value
    const number = document.getElementById('number').value
    const password = document.getElementById('password_1').value

    if(name == '' || username == '' || number == '' || password == ''){
        alert('Please fill all the fields')
        return
    }
    const data = {
        username: username,
        number: number,
        name: name,
        password: password
    }
    console.log(data)
    axios.post('http://localhost/project/signup.php', data)
    .then(res => {
        console.log(res)
        alert(res.data.message)
        window.location.href = '/login/'
    })
    .catch(err => {
        alert(err.response.data.message)
    })
}

const signin = () => {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if(username == '' || password == ''){
        alert('Please fill all the fields')
        return
    }
    const data = {
        username: username,
        password: password
    }
    console.log(data)
    axios.post('http://localhost/project/signin.php', data).then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        window.location.href = '/'
    })
    .catch(err => {
        alert(err.response.data.message)
    })
}