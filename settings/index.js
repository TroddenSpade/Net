
var name_ = localStorage.getItem('name')

console.log(name_)

let input_name = document.getElementById('input_name')

input_name.placeholder = name_

let input_image = document.getElementById('input_image')

input_image.onchange = function(evt){
    var files = evt.target.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('img').src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }

    // Not supported
    else {
        alert('File not supported!');
    }
}

function send(){
    if(input_name.value == '' && input_image.value == ''){
        alert('Please at least make a change.')
        return
    }

    let formData = new FormData();

    formData.append('token', localStorage.getItem('token'))
    
    if(input_name.value != ''){
        formData.append('name', input_name.value)
    }

    if(input_image.value != ''){
        formData.append('image', input_image.files[0])
    }
  
    axios.post('http://localhost/project/edit.php',
        formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }
    ).then(function(data){
        window.location.href = '/'
    })
    .catch(function(){
        alert('Something went wrong.')
    });
}