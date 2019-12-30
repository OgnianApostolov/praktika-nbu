const $uploadbtn = document.querySelector('#upload');
const $usebtn = document.querySelector('#use');
const $deletebtn = document.querySelector('#delete');
const $refreshbtn = document.querySelector('#refresh');
$usebtn.disabled = true;
$deletebtn.disabled = true;
const $count = document.querySelector('.count');

const medias = document.querySelectorAll('.cropmedia');
for (let i = 0; i < medias.length; i++) {
    
  const media = medias[i];
  media.addEventListener('click', (e) => {
    e.preventDefault();//do not refresh page
    if(media.getAttribute('class') === 'cropmedia selected'){
      media.setAttribute("class", "cropmedia");        
    }
    else{
      media.setAttribute("class", "cropmedia selected");        
    }
    
    const selected = document.querySelectorAll('.cropmedia.selected')
    if(selected.length === 0){
      $usebtn.disabled = true;
      $deletebtn.disabled = true;
    }
    else{
      $usebtn.disabled = false;
      $deletebtn.disabled = false;
    }
    $count.innerHTML = `${selected.length} selected items`;
  });
}

$uploadbtn.addEventListener('click', (e) => {
  e.preventDefault()
  document.querySelector('#media-form').submit();
});

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
 
  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }
    
    var reader = new FileReader();
    
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.          
        var span = document.createElement('span');
        span.innerHTML = ['<img class="cropmedia thumbnail" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    })(f);
    
    // Read in the image file as a formData URL.
    reader.readAsDataURL(f);
  }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

$deletebtn.addEventListener('click', (e) => {
    const mediasToDelete = document.querySelectorAll('.cropmedia.selected');
    for (let i = 0; i < mediasToDelete.length; i++) {
      const media = mediasToDelete[i];
      deleteRequest(media.id);
      media.remove();
    }
    $usebtn.disabled = true;
    $deletebtn.disabled = true;
    $refreshbtn.disabled = false;
});

$refreshbtn.addEventListener('click', (e) => {
  location.reload();
});

function deleteRequest(id){
  const http = new XMLHttpRequest();
  const url = `/medias/${id}`;
  
  http.open('DELETE', url, true);
  http.setRequestHeader('Content-type', 'application/json');
  http.send();
}

