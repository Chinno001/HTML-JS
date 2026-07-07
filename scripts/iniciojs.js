// Los comentarios en JS se inician con doble slash
// alert('Cargando JS desde un script externo.');

// Definición de variables
let miVariable = 'Buenas Tardes estudiantes.';
console.log(miVariable);

// Definición de constantes
const miConstante = true;
console.log(miConstante)

// Asignación de valores
miVariable = 'Hola';
console.log(miVariable);
// No es posible asignar un nuevo valor a una constante
// miConstante = 'Nuevo Valor';
// console.log(miConstante);

let numero1 = 25;
let numero2 = 15;
miVariable = numero1 + numero2;
console.log(miVariable);
miVariable = miConstante;
console.log(miVariable);

let miPaginaWeb = document;
console.log(miPaginaWeb);

window.onload = function () {
    let cuerpo = document.getElementById('cuerpoPagina');
    console.log(cuerpo);
    cuerpo.style = 'background-color:black;'
}