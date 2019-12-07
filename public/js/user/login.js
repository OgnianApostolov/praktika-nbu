const username = document.querySelector('#username');
const password = document.querySelector('#password');
const $submit = document.querySelector('button');
const $response = document.querySelector('p');

$submit.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
   
    const data = {
        email: username.value,
        password: password.value
    };
    
    loginRequest(data);
});

function loginRequest(data){
    const http = new XMLHttpRequest();
    const url = '/users/login';
    
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.reload();
        }
    }
    http.send(JSON.stringify(data));
}

