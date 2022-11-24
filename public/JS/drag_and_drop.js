
const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.headerD');

let inputIMG = document.querySelector('#ImagenSRC')
let button = document.querySelector('.buttonD');
let input = document.querySelector('#ImaP');
let nombreArchivo = document.querySelector('#FileNameIMG')

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
    let nombres = file.name;
    
    //console.log(fileType);
    //console.log("Archivo dejado");

    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if(validExtensions.includes(fileType)){
        let fileReader = new FileReader();

        fileReader.onload = ()=>{

            let fileURL = fileReader.result;
            
            inputIMG.value= fileType.split('/').pop();
            nombreArchivo.value = nombres;

            console.log(inputIMG.value)
            console.log(nombreArchivo.value)
            let imgTag = `<img src = "${fileURL}" alt="">`;
            dragArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }else{
        alert('Este Archivo no es una imagen');
        dragArea.classList.remove('active');
    }
}

