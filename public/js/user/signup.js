const $adminSignupForm = document.querySelector('#adminSignupForm');
const username = $adminSignupForm.querySelector('#email');
const password = $adminSignupForm.querySelector('#password');
const $submit = $adminSignupForm.querySelector('button');
const $response = $adminSignupForm.querySelector('p');

$submit.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    
    if(password.value.length > 7){
        const data = {
            email: email.value,
            password: password.value
        };
    
        signupRequest(data);
    }
    else{
        $response.innerHTML = 'The chosen password is too short'
    }
});

function signupRequest(data){
    const http = new XMLHttpRequest();
    const url = '/users';
    
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            window.open('/account-confirmation', '_self');
        }
        else{
            $response.innerHTML = 'This email already exist'
        }
    }
    http.send(JSON.stringify(data));
}

