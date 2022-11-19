function search_product() {
    let input = document.getElementById('inputbuscar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('card');
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}