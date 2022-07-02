// import axios from 'axios'


export function autoSignin(){
    if(localStorage.getItem('token')){
        let token = localStorage.getItem('token')
        return axios.post('http://localhost/project/user.php', {token}).then(res => {
            localStorage.setItem('name', res.data.name)
            return {
                user: res.data,
                login_state: true
            }
        }).catch(err => { 
            localStorage.removeItem('token')
            return {login_state: false}
         })
    }else{
        localStorage.removeItem('token')
        return {login_state: false}
    }
}