const $adminLoginForm = document.querySelector('#adminLoginForm');
const username = $adminLoginForm.querySelector('#username');
const password = $adminLoginForm.querySelector('#password');
const $submit = $adminLoginForm.querySelector('button');
const $response = $adminLoginForm.querySelector('p');

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
            window.history.back();
        }
    }
    http.send(JSON.stringify(data));
}

