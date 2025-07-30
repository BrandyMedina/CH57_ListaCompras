const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

// Validar contidad
function validarCantidad(){
    if(txtNumber.value.length == 0){
        return false;
    } //Que tenga informacion 

    if (isNaN(txtNumber.value)){
        return false;
    } //Tiene que ser un número

    if (Number(txtNumber.value)<=0){
        return false;
    }//Mayor que 0

    return true;
}; //Validar cantidad


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    // Limpia la alerta
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    txtName.style.border= "";
    txtNumber.style.border= "";


    // Validar que tenga informacion minimo 3 letras 

    if (txtName.value.length < 3){
        // Mensaje de error cuando sea menor que 3
        txtName.style.border = "medium red solid";
        alertValidacionesTexto.innerHTML = "<strong> El nombre del producto no es correcto <strong><br/>";
        alertValidaciones.style.display = "block";
        
    }

    if (!validarCantidad()){

        txtNumber.style.border ="medium red solid";
        alertValidacionesTexto.innerHTML += "<strong> La cantidad no es Correcta <strong>";
        alertValidaciones.style.display = "block";
    }
});

// btnClear.addEventListener("click",function(event){
//     event.preventDefault();

// })