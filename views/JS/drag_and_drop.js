const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.headerD');

let button = document.querySelector('.buttonD');
let input = document.querySelector('#ImaP');

let file;

button.onclick = () =>{
    input.click();
}

//Cuando se busca

input.addEventListener('change', function(){
    file = this.files[0];
    dragArea.classList.add('active');
    displayFile();

})

//cuando el archibo está en el drag area

dragArea.addEventListener('dragover', (event) =>{
    event.preventDefault();
    dragText.textContent = 'Preparado para subir'
    dragArea.classList.add('active')
    //console.log('file is inside the drag area');
});

// cuando el archivo deja el drag area

dragArea.addEventListener('dragleave', () =>{
    //console.log('dejó el area');
    dragText.textContent = 'Arrastra y suelta'
    dragArea.classList.remove('active')

});

// Cuando es droppeado al contador

dragArea.addEventListener('drop', (event) =>{
    event.preventDefault();

    file = event.dataTransfer.files[0];
    //console.log(file);
    displayFile();
    
});

function displayFile(){
    let fileType = file.type;
    
    //console.log(fileType);
    //console.log("Archivo dejado");

    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if(validExtensions.includes(fileType)){
        let fileReader = new FileReader();

        fileReader.onload = ()=>{

            let fileURL = fileReader.result;
            //console.log(fileURL)
            let imgTag = `<img src = "${fileURL}" alt="">`;
            dragArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }else{
        alert('Este Archivo no es una imagen');
        dragArea.classList.remove('active');
    }
}