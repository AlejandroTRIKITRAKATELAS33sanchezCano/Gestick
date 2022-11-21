var form = document.getElementById("formulario_v");
var idin = document.getElementById("id");
var invalmsgid = document.getElementById("invalmsgid");

form.addEventListener("submit", (evt)=>{
    var invalchar = `{}$'@<>;:`;
    if (idin.value.length === 0){
        invalmsgid.innerHTML = "Debe ingresar su ID.";
        evt.preventDefault();
    }
    for (var i = 0; i < idin.value.length; i++){
        if(invalchar.indexOf(idin.value.charAt(i)) > -1){
            invalmsgid.innerHTML = "No se permite el uso de carácteres especiales ({}$'@<>;:).";
            evt.preventDefault();
            break;
        }
    }
})