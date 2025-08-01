const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const tablaProd = tablaListaCompras.getElementsByTagName("tbody").item(0);


const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;

let datos = new Array(); // [];

// Validar contidad
function validarCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    } //Que tenga informacion 

    if (isNaN(txtNumber.value)) {
        return false;
    } //Tiene que ser un número

    if (Number(txtNumber.value) <= 0) {
        return false;
    }//Mayor que 0

    return true;
}; //Validar cantidad

function getprecio() {
    return Math.round(Math.random() * 10000) / 100;
} //Obtener precio de forma random


btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true;

    // Limpia la alerta
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    txtName.style.border = "";
    txtNumber.style.border = "";


    // Validar que tenga informacion minimo 3 letras 

    if (txtName.value.length < 3) {
        // Mensaje de error cuando sea menor que 3
        txtName.style.border = "medium red solid";
        alertValidacionesTexto.innerHTML = "<strong> El nombre del producto no es correcto <strong><br/>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (!validarCantidad()) {

        txtNumber.style.border = "medium red solid";
        alertValidacionesTexto.innerHTML += "<strong> La cantidad no es Correcta <strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        cont++;
        let precio = getprecio();
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;

        let elemento = {
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio": precio
        };

        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));


        tablaProd.insertAdjacentHTML("beforeend", row);

        contadorProductos.innerText = cont;

        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        costoTotal += precio * Number(txtNumber.value);

        precioTotal.innerText = new Intl.NumberFormat("es-MX",
            { style: "currency", currency: "MXN" }).format(costoTotal);

        let resumen = {
            "cont": cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        };

        localStorage.setItem("resumen", JSON.stringify(resumen));



        // Limpia los campos 
        txtName.value = "";
        txtNumber.value = "";
        // se queda activado el campo de nombre para anotar el sig, producto
        txtName.focus();

    } //isValid
}); //btnAgregar click


window.addEventListener("load", function (event) {
    event.preventDefault();

    if (this.localStorage.getItem("datos") != null) {

        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((dato) => {
            let row = `<tr>
                    <td>${dato.cont}</td>
                    <td>${dato.nombre}</td>
                    <td>${dato.cantidad}</td>
                    <td>${dato.precio}</td>
                </tr>`;
            tablaProd.insertAdjacentHTML("beforeend", row);
        }); //forEach

    }//datos !=null

    if (this.localStorage.getItem("resumen") != null) {
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    } //resumen !=null

    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX",
        { style: "currency", currency: "MXN" }).format(costoTotal);

}); //window load

// Limpiar todo 
// 1. Eliminar el localStorage
// 2.Limpiar la tabla
// 3.Limpiar los campos
// 4.Limpiar borde de los campos
// 5. Limpiar los alerts
// 6.Limpiar el resumen, eliminar los elementos del arreglo 


btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    //1.
    localStorage.clear();
    // localStorage.removeItem("")
    // localStorage.removeItem("")

    //2.
    tablaProd.innerHTML = " ";
    //3.
    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
    //4. 
    txtName.style.border = "";
    txtNumber.style.border = "";
    //5. Limpia los alerts
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    //6. Limpiar el Resumen
    cont = 0;
    totalEnProductos = 0;
    costoTotal = 0;

    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX",
        { style: "currency", currency: "MXN" }).format(costoTotal);

    datos= new Array(); //Se encarga de eliminar los elementos de la tabla

});//Limpiar todo 