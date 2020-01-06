const doctor_id = document.querySelector('#doctor_id').innerHTML;
const $form = document.querySelector('#doctor-form');
const name = document.querySelector('#name');
const type = document.querySelector('#type');
const city = document.querySelector('#city');
const notes = document.querySelector('#notes');

const monday_active = document.querySelector('#monday_active');
const $addMondayHours = document.querySelector('#addMondayHours');
const $monday_hours_div = document.querySelector('#monday_hours');

const tuesday_active = document.querySelector('#tuesday_active');
const $addTuesdayHours = document.querySelector('#addTuesdayHours');
const $tuesday_hours_div = document.querySelector('#tuesday_hours');

const wednesday_active = document.querySelector('#wednesday_active');
const $addWednesdayHours = document.querySelector('#addWednesdayHours');
const $wednesday_hours_div = document.querySelector('#wednesday_hours');

const thursday_active = document.querySelector('#thursday_active');
const $addThursdayHours = document.querySelector('#addThursdayHours');
const $thursday_hours_div = document.querySelector('#thursday_hours');

const friday_active = document.querySelector('#friday_active');
const $addFridayHours = document.querySelector('#addFridayHours');
const $friday_hours_div = document.querySelector('#friday_hours');

const saturday_active = document.querySelector('#saturday_active');
const $addSaturdayHours = document.querySelector('#addSaturdayHours');
const $saturday_hours_div = document.querySelector('#saturday_hours');

const sunday_active = document.querySelector('#sunday_active');
const $addSundayHours = document.querySelector('#addSundayHours');
const $sunday_hours_div = document.querySelector('#sunday_hours');

const $submit = document.querySelector('#save');
const $close = document.querySelector('#close');
const $delete = document.querySelector('#del');
const $response = document.querySelector('#response');
var selectedMediaIds = [];

if(doctor_id !== ''){
    initializeListeners()
}

function addHoursFor(addBtn, div){    
    addBtn.addEventListener('click', (e) => {
        const holder = document.createElement('div');
        holder.setAttribute('class', 'holder');
        div.appendChild(holder);
        
        holder.appendChild(document.createElement('br'));
        
        const b = document.createElement('button')
        b.setAttribute('type', 'submit');
        b.setAttribute('class', 'btn btn-danger remove_image');
        holder.appendChild(b);
    
        const remove = document.createElement('i');
        remove.setAttribute('class', 'fas fa-minus-circle');
        b.appendChild(remove);
    
        holder.appendChild(document.createElement('br'));
        holder.appendChild(document.createElement('br'));
    
        const label = document.createElement('label');
        label.innerHTML = 'Booking hours';
        holder.appendChild(label);
    
        const timepicker_group = document.createElement('div');
        timepicker_group.setAttribute('class', 'input-group bootstrap-timepicker timepicker');
        holder.append(timepicker_group)
    
        const start = document.createElement('input');
        start.id = 'start';
        start.setAttribute('type', 'text');
        start.setAttribute('class', 'col-sm-2 form-control timepicker');
        start.setAttribute('aria-describedby', 'clock-icon');
        timepicker_group.appendChild(start);
    
        const end = document.createElement('input');
        end.id = 'end';
        end.setAttribute('type', 'text');
        end.setAttribute('class', 'col-sm-2 form-control timepicker');
        end.setAttribute('aria-describedby', 'clock-icon');
        timepicker_group.appendChild(end);
    
        const input_append = document.createElement('div');
        input_append.setAttribute('class', 'input-group-append input-group-addon');
        timepicker_group.appendChild(input_append);
    
        const clock_icon = document.createElement('span');
        clock_icon.id = 'clock_icon';
        clock_icon.setAttribute('class', 'input-group-text');
        input_append.appendChild(clock_icon);
    
        const clock = document.createElement('i');
        clock.setAttribute('class', 'far fa-clock');
        clock_icon.appendChild(clock);
        
        $('.timepicker').timepicker({
            minuteStep: 1
        });
    
        holder.appendChild(document.createElement('br'));
        
        b.addEventListener('click', (e) => {
            e.preventDefault();
            
            if(doctor_id !== ''){
                // deleteMedia(mediasToAdd[i].id)
            }
            holder.remove();
        });
    });
}

addHoursFor($addMondayHours, $monday_hours_div);
addHoursFor($addTuesdayHours, $tuesday_hours_div);
addHoursFor($addWednesdayHours, $wednesday_hours_div);
addHoursFor($addThursdayHours, $thursday_hours_div);
addHoursFor($addFridayHours, $friday_hours_div);
addHoursFor($addSaturdayHours, $saturday_hours_div);
addHoursFor($addSundayHours, $sunday_hours_div);

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

    const data = {
        name: name.value,
        type: type.value,
        city: city.value,
        notes: notes.value,
        monday: {
            active: monday_active.checked,
            hours: []
        },
        tuesday: {
            active: tuesday_active.checked,
            hours: []
        },
        wednesday: {
            active: wednesday_active.checked,
            hours: []
        },
        thursday: {
            active: thursday_active.checked,
            hours: []
        },
        friday: {
            active: friday_active.checked,
            hours: []
        },
        saturday: {
            active: saturday_active.checked,
            hours: []
        },
        sunday: {
            active: sunday_active.checked,
            hours: []
        },
        medias: selectedMediaIds,
    };    
    
    function appendHours(hours_div, append_to){
        const hours = hours_div.querySelectorAll('.holder');
        
        for (let i = 0; i < hours.length; i++) {
            
            const start = hours[i].querySelector('#start').value;
            const end = hours[i].querySelector('#end').value;

            append_to.hours.push({start, end});
        }
    }

    appendHours($monday_hours_div, data.monday);
    appendHours($tuesday_hours_div, data.tuesday);
    appendHours($wednesday_hours_div, data.wednesday);
    appendHours($thursday_hours_div, data.thursday);
    appendHours($friday_hours_div, data.friday);
    appendHours($saturday_hours_div, data.saturday);
    appendHours($sunday_hours_div, data.sunday);

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

    
    
    function initHours(hours_div){
        const hours = hours_div.querySelectorAll('.holder');
        
        for (let i = 0; i < hours.length; i++) {
            
            const holder = hours[i];
        
            const b = holder.querySelector('button');
            b.addEventListener('click', (e) => {
                e.preventDefault();
                holder.remove();
            });
        }
    }
    $('.timepicker').timepicker({
        minuteStep: 1
    });

    initHours($monday_hours_div);
    initHours($tuesday_hours_div);
    initHours($wednesday_hours_div);
    initHours($thursday_hours_div);
    initHours($friday_hours_div);
    initHours($saturday_hours_div);
    initHours($sunday_hours_div);
}