const $adminResetPasswordForm = document.querySelector('#adminResetPasswordForm');
const username = $adminResetPasswordForm.querySelector('#email');
const password = $adminResetPasswordForm.querySelector('#password');
const $submit = $adminResetPasswordForm.querySelector('button');
const $response = $adminResetPasswordForm.querySelector('p');

$submit.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    if(password.value.length > 7){
        const data = {
            password: password.value
        }        
        resetPasswordRequest(data);
    }
    else{
        $response.innerHTML = 'The chosen password is too short'
    }
});

function resetPasswordRequest(data){
    const http = new XMLHttpRequest();
    const url = '/change-password/' + username.value;
    
    http.open('PATCH', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 201) {
            $response.innerHTML = 'Password was reset.'
        }
    }
    http.send(JSON.stringify(data));
}

