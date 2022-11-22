let form = document.getElementById("formulario_v");
let apin = document.getElementById("AP");
let amin = document.getElementById("AM");
let namein = document.getElementById("name");
let pwin = document.getElementById("PW");
let pwcin = document.getElementById("PWC");
let invalmsg = document.getElementById("invalmsg");
let invalchar = `"{}$'@<>;:`;

form.addEventListener("submit", (evt)=>{
    invalmsg.innerHTML = "";
    if (apin.value.length === 0){
        invalmsg.innerHTML += "Debe ingresar su Apellido Paterno.";
        evt.preventDefault();
    }
    for (var i = 0; i < apin.value.length; i++){
        if(invalchar.indexOf(apin.value.charAt(i)) > -1){
            invalmsg.innerHTML = "No se permite el uso de carácteres especiales ({}$'@<>;:).";
            evt.preventDefault();
            break;
        }
    }
    
    if (namein.value.length === 0){
        invalmsg.innerHTML += "Debe ingresar su Apellido Materno.";
        evt.preventDefault();
    }
    for (var i = 0; i < namein.value.length; i++){
        if(invalchar.indexOf(namein.value.charAt(i)) > -1){
            invalmsg.innerHTML = "No se permite el uso de carácteres especiales ({}$'@<>;:).";
            evt.preventDefault();
            break;
        }
    }
    
    if (pwin.value.length === 0){
        invalmsg.innerHTML += "Debe ingresar su(s) Nombre(s).";
        evt.preventDefault();
    }
    for (var i = 0; i < pwin.value.length; i++){
        if(invalchar.indexOf(pwin.value.charAt(i)) > -1){
            invalmsg.innerHTML = "No se permite el uso de carácteres especiales ({}$'@<>;:).";
            evt.preventDefault();
            break;
        }
    }
    
    if (pwcin.value != pwin.value){
        invalmsg.innerHTML += "Las contraseñas no coinciden.";
        evt.preventDefault();
    }
})