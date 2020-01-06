const user_id = document.querySelector('#user_id').innerHTML;
const $form = document.querySelector('#user-form');
const text = $form.querySelector('#text');
const $submit = document.querySelector('#save');
const $close = document.querySelector('#close');
const $delete = document.querySelector('#del');
const $response = document.querySelector('#response');

CKEDITOR.replace('ambulatory_list', {
    height: '30vh',
    extraPlugins: 'easyimage',
    removePlugins: 'image',
    //cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
    //cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
});

$submit.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
   
    const data = {
        ambulatory_list: CKEDITOR.instances.ambulatory_list.getData()
    };
    
    updateRequest(data);
});

$close.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    
    window.open('/admin-users', '_self');
});


$delete.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    
    deleteRequest();
});

function updateRequest(data){
    const http = new XMLHttpRequest();
    const url = '/users/' + user_id;    
    
    http.open('PATCH', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.open('/admin-user', '_self');
        }
        else{
            return $response.innerHTML = "There was an error, please try again."
        }
    }
    http.send(JSON.stringify(data));
}

function deleteRequest(){
    
    const http = new XMLHttpRequest();
    const url = '/users/' + user_id;    
    
    http.open('DELETE', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.open('/admin-user', '_self');
        }
        else{
            return $response.innerHTML = "There was an error, please try again."
        }
    }
    http.send(null);
}