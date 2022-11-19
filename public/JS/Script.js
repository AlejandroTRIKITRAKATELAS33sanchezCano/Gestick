'use strict'

const grande = document.querySelector('.grande')
const punto  = document.querySelectorAll('.punto')

//Cuando Click en punto
    //Saber la posicion de ese punto
    //Aplicar un transform Translate X al grande
    //Quitar la clase activo
    //Añadir la clase activo al punto que hemos hecho click


//RECORRER LOS PUNTOS
punto.forEach ((cadaPunto, i ) => {
    punto[i].addEventListener('click', ()=>{

        //Asiganar un click a cadaPunto
        let posicion = i
        //Calculo de el movimiento
        let operacion = posicion * -50

        //Ejecutar movimiento
        grande.style.transform = `translateX(${ operacion }%)`

        //Recorremos todos los puntos
        punto.forEach ((cadaPunto, i )=>{
            //Quitamos la clase Activo a todos los puntos
            punto[i].classList.remove('activo')
        })
            //Añadimos la clase Activo de el punto
        punto[i].classList.add('activo')
    })
})

function traer(){
    //document.documentElement.style.setProperty('--btn-color','pink')
    console.log("funcion traer")
}

function pink(){ document.body.style.backgroundColor = "pink"; }



function iniciar(){
    alert("BIENVENIDO USUARI@ nombre")
}









let cantidadvar=1;
let cantidadvar2=1;
let cantidadvar3=0;
let cantidadvar4=0;
let cantidadvar5=0;
let cantidadvar6=0;
let cantidadvar7=0;
let cantidadvar8=0;

function cantidadproductos(){
    document.getElementById("cantidad").innerHTML = cantidadvar;
    cantidadvar = cantidadvar+1;
}


function cantidadproductosdos(){
cantidadvar = cantidadvar-1
if(cantidadvar>=0){
    document.getElementById("cantidad").innerHTML = cantidadvar;

}else{
    cantidadvar=0
    document.getElementById("cantidad").innerHTML = cantidadvar;
}
}



function cantidadproductos2(){
    document.getElementById("cantidad2").innerHTML = cantidadvar2;
    cantidadvar2 = cantidadvar2+1;
}


function cantidadproductosdos2(){
cantidadvar2 = cantidadvar2-1
if(cantidadvar2>=0){
    
    document.getElementById("cantidad2").innerHTML = cantidadvar2;

}else{
    cantidadvar2=0
    document.getElementById("cantidad2").innerHTML = cantidadvar2;
}

}




function cantidadproductos3(){
    document.getElementById("cantidad3").innerHTML = cantidadvar3;
    cantidadvar3 = cantidadvar3+1;
}


function cantidadproductosdos3(){
cantidadvar3 = cantidadvar3-1
if(cantidadvar3>=0){
    document.getElementById("cantidad3").innerHTML = cantidadvar3;

}else{
    cantidadvar3=0
    document.getElementById("cantidad3").innerHTML = cantidadvar3;
}
}





function cantidadproductos4(){
    document.getElementById("cantidad4").innerHTML = cantidadvar4;
    cantidadvar4 = cantidadvar4+1;
}


function cantidadproductosdos4(){
cantidadvar4 = cantidadvar4-1
if(cantidadvar4>=0){
    document.getElementById("cantidad4").innerHTML = cantidadvar4;

}else{
    cantidadvar4=0
    document.getElementById("cantidad4").innerHTML = cantidadvar4;
}
}




function cantidadproductos5(){
    document.getElementById("cantidad5").innerHTML = cantidadvar5;
    cantidadvar5 = cantidadvar5+1;
}


function cantidadproductosdos5(){
cantidadvar5 = cantidadvar5-1
if(cantidadvar5>=0){
    document.getElementById("cantidad5").innerHTML = cantidadvar5;
}else{
    cantidadvar5=0
    document.getElementById("cantidad5").innerHTML = cantidadvar5;
}
}







function cantidadproductos6(){
    document.getElementById("cantidad6").innerHTML = cantidadvar6;
    cantidadvar6 = cantidadvar6+1;
}


function cantidadproductosdos6(){
cantidadvar6 = cantidadvar6-1
if(cantidadvar6>=0){
    document.getElementById("cantidad6").innerHTML = cantidadvar6;

}else{
    cantidadvar6=0
    document.getElementById("cantidad6").innerHTML = cantidadvar6;
}
}






function cantidadproductos7(){
    document.getElementById("cantidad7").innerHTML = cantidadvar7;
    cantidadvar7 = cantidadvar7+1;
}


function cantidadproductosdos7(){
cantidadvar7 = cantidadvar7-1
if(cantidadvar7>=0){
    document.getElementById("cantidad7").innerHTML = cantidadvar7;

}else{
    cantidadvar7=0
    document.getElementById("cantidad7").innerHTML = cantidadvar7;
}
}




function cantidadproductos8(){
    document.getElementById("cantidad8").innerHTML = cantidadvar8;
    cantidadvar8 = cantidadvar8+1;
}


function cantidadproductosdos8(){
cantidadvar8 = cantidadvar8-1
if(cantidadvar8>=0){
    document.getElementById("cantidad8").innerHTML = cantidadvar8;

}else{
    cantidadvar8=0
    document.getElementById("cantidad8").innerHTML = cantidadvar8;
}
}

function restablecer(){
    document.getElementById("cantidad").innerHTML = 0;
    document.getElementById("cantidad2").innerHTML = 0;
    document.getElementById("cantidad3").innerHTML = 0;
    document.getElementById("cantidad4").innerHTML = 0;
    document.getElementById("cantidad5").innerHTML = 0;
    document.getElementById("cantidad6").innerHTML = 0;
    document.getElementById("cantidad7").innerHTML = 0;
    document.getElementById("cantidad8").innerHTML = 0;

}