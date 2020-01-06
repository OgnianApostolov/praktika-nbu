const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const username = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const $submit = document.querySelector('button');
const $validationMsgs = document.querySelector('#validateMsg');

const passwordLengthMsg = 'The chosen password is too short';
const confirmationMsg = 'Confromation password does not match';
const emailAlreadyUsed = 'This email address is already used';

function validateInputFields() {
    refreshValidationMsgs();

    if (password.value.length > 1) {
        if (password.value === confirmPassword.value) {
            
            const data = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            };

            signupRequest(data);
        }
        else {
            appendValidationMsg(confirmationMsg);
        }
    }
    else {
        appendValidationMsg(passwordLengthMsg);
    }
}

function signupRequest(data){
    const http = new XMLHttpRequest();
    const url = '/users';
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 400) {
            appendValidationMsg(emailAlreadyUsed);
        } else if (this.readyState == 4 && this.status == 201) {
            window.location.href = '/users/me';
        }
    }

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(data));
    
}

function appendValidationMsg(msg, attribute) {
    if(!isValidateMsgExists(msg)) {  
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(msg));
        li.setAttribute("id", attribute);
        $validationMsgs.appendChild(li);
    }
}

function refreshValidationMsgs() {
    var msgWrapper = document.getElementById("validateMsg");
    msgWrapper.innerHTML = "";
}

function isValidateMsgExists(msg) {
    for (var i = 0; i < $validationMsgs.children.length; i++) {
        if ($validationMsgs.children[i].innerText === msg) {
            return true;
        }
    }
    
    return false;
}

$("#signupForm").submit(function(e) {
    e.preventDefault();
});