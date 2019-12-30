const doctor_id = document.querySelector('#doctor_id').innerHTML;
const $form = document.querySelector('#doctor-form');
const name = document.querySelector('#name');
const ribbon = document.querySelector('#ribbon');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const published = document.querySelector('#published');
const $submit = document.querySelector('#save');
const $close = document.querySelector('#close');
const $delete = document.querySelector('#del');
const $response = document.querySelector('#response');
var selectedMediaIds = [];

if(doctor_id !== ''){
    initializeListeners()
}

CKEDITOR.replace('description', {
    height: '30vh',
    extraPlugins: 'easyimage',
    removePlugins: 'image',
    //cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
    //cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
});

$usebtn.addEventListener('click', (e) => {
    const mediasToAdd = document.querySelectorAll('.cropmedia.selected');
    if(mediasToAdd.length > 12){
        return alert('You can only add up to 12 images.');
    }
    else{
        const image_container = document.querySelector('#image-container');
        for (let i = 0; i < mediasToAdd.length; i++) {
            const img_div = document.createElement('div');
            img_div.setAttribute('class', 'col-sm-6 col-md-3 col-lg-2');

            const b = document.createElement('button');
            b.setAttribute('type', 'submit');
            b.setAttribute('class', 'btn btn-danger remove_image');
            img_div.appendChild(b);

            const remove = document.createElement('i');
            remove.setAttribute('class', 'fas fa-minus-circle');
            b.appendChild(remove);

            const img = document.createElement('img');
            img.src = `/medias/${mediasToAdd[i].id}`;
            img.setAttribute('class', 'cropmedia');
            img_div.appendChild(img);
            
            image_container.appendChild(img_div);

            b.addEventListener('click', (e) => {
                e.preventDefault();
                
                mediasToAdd[i].setAttribute('class', 'cropmedia');
                selectedMediaIds = selectedMediaIds.filter(item => item.media !== mediasToAdd[i].id)
                img_div.remove();
            });
        }
        selectedMediaIds = [];
        for (let i = 0; i < mediasToAdd.length; i++) {
            selectedMediaIds.push({media: mediasToAdd[i].id});
        }
        alert('Successfully added.');
    }
});

$submit.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page

    var grouping = [];

    for(var i = 0; i < $('#grouping').val().length; i ++){
        grouping.push({collection_id: $('#grouping').val()[i]});
    }    

    const data = {
        name: name.value,
        ribbon: ribbon.value,
        price: price.value,
        description: CKEDITOR.instances.description.getData(),
        published: published.checked,
        doctor_informations: [],
        doctor_options: [],
        medias: selectedMediaIds,
        collection_id: collection.value,
        grouping
    };

    if(doctor_id !== ''){
        if(data.medias.length === 0){
            delete data.medias;
        }
                
        updateRequest(data);
    }
    else{
        postRequest(data);
    }
});

$close.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    
    window.open('/admin-doctors', '_self');
});


$delete.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    
    deleteRequest();
});

function postRequest(data){
    const http = new XMLHttpRequest();
    const url = '/doctors';
    
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 201) {
            window.open('/admin-doctors', '_self');
        }
        else{
            if(http.responseText.includes("dup key")){                
                return $response.innerHTML = "A doctor with this name exists!"
            }
            else{
                return $response.innerHTML = "Make sure You have filled all input fields!"
            }
        }
    }
    http.send(JSON.stringify(data));
}

function updateRequest(data){
    const http = new XMLHttpRequest();
    const url = '/doctors/' + doctor_id;    
    
    http.open('PATCH', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.open('/admin-doctors', '_self');
        }
        else{
            return $response.innerHTML = "There was an error, please try again."
        }
    }
    http.send(JSON.stringify(data));
}

function deleteRequest(){
    
    const http = new XMLHttpRequest();
    const url = '/doctors/' + doctor_id;    
    
    http.open('DELETE', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.open('/admin-doctors', '_self');
        }
        else{
            return $response.innerHTML = "There was an error, please try again."
        }
    }
    http.send(null);
}

function initializeListeners(){
    const image_container = document.querySelector('#image-container');
    const imgList = image_container.querySelectorAll('div');
    for (let i = 0; i < imgList.length; i++) {
        const holder = imgList[i];
        const img = holder.querySelector('img');
        selectedMediaIds.push({media: img.id});
        const b = holder.querySelector('button');
        b.addEventListener('click', (e) => {
            e.preventDefault();

            console.log('before: ' + selectedMediaIds);
            selectedMediaIds = selectedMediaIds.filter(item => item.media !== img.id)
            console.log('after: ' + selectedMediaIds);

            holder.remove();
        });
    }
}