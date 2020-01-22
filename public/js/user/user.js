const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const new_password = document.querySelector('#new_password');
const confirm_password = document.querySelector('#confirm_password');

const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const phone_number = document.querySelector('#phone_number');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const state = document.querySelector('#state');
const country = document.querySelector('#country');
const zip_code = document.querySelector('#zip_code');

const organization_name = document.querySelector('#organization_name');
const tax_identification_number = document.querySelector('#tax_identification_number');

const notes = document.querySelector('#notes');

$('#blacklist').selectpicker('val', blacklist_from_server);
const blacklist_menu = document.querySelector('#blacklist');

const $saveInfo = document.querySelector('#saveInfo');
const $changePass = document.querySelector('#changePass');
const $logout = document.querySelector('#logout');
const $response = document.querySelector('#response');


blacklist_menu.addEventListener('change', (e) => {
    e.preventDefault();//do not refresh page
    
    var blacklist = [];
    
        for(var i = 0; i < $('#blacklist').val().length; i ++){
            blacklist.push({doctor_id: $('#blacklist').val()[i]});
        }  

    const data = {
        blacklist
    };

    updateRequest(data);
});

$saveInfo.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page

    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
    };

    updateRequest(data);
});

$changePass.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page

    if(new_password.value.length > 7){
        if(new_password.value === confirm_password.value){
            const data = {
                password: new_password.value
            };

        updateRequest(data);
        }
        else{
            return $response.innerHTML = 'New password confirmation failed'
        }
    }
    else{
        return $response.innerHTML = 'The new password must be at least 8 characters'
    }
});


$logout.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    
    logoutRequest();
});

function updateRequest(data){
    const http = new XMLHttpRequest();
    const url = '/user/me';    
    
    http.open('PATCH', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.open('/users/me', '_self');
        }
        else{
            return $response.innerHTML = "There was an error, please try again."
        }
    }
    http.send(JSON.stringify(data));
}

function logoutRequest(){
    
    const http = new XMLHttpRequest();
    const url = '/users/logout';    
    
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.open('/', '_self');
        }
        else{
            return $response.innerHTML = "There was an error, please try again."
        }
    }
    http.send(null);
}