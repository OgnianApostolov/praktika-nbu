const $adminPasswordResetForm = document.querySelector('#adminPasswordResetForm');
const username = $adminPasswordResetForm.querySelector('#email');
const $submit = $adminPasswordResetForm.querySelector('button');
const $response = $adminPasswordResetForm.querySelector('p');

$submit.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    passwordResetRequest();
});

function passwordResetRequest(){
    const http = new XMLHttpRequest();    
    const url = '/users/send-password-reset/' + username.value;
    
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 201) {
            $response.innerHTML = 'Please, check Your email.'
        }
    }
    http.send(JSON.stringify(null));
}

