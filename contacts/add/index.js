var number_input = document.getElementById('number_input');

const add = () => {
    if(number_input.value == ''){
        alert('Please enter a number');
        return
    }

    var number = number_input.value;

    let token = localStorage.getItem('token');

    axios.post('http://localhost/project/add_contact.php', {number, token})
    .then(function(response){
        console.log(response);
        alert('Contact added');
        window.location.href = '/contacts';
    }).catch(function(error){
        console.log(error);
        alert('Error: ' + error.response.data.message);
    })

}