$(document).ready(function () {
    $('#tablaUsuarios').DataTable({  //aqui se trae una tabla desde un json placeholder y se le da formato con datatables
        ajax: {                         //y se le nombra a cada columna con el nombre de la propiedad del json
            url: 'https://jsonplaceholder.typicode.com/users',
            dataSrc: ''
        },
        columns: [
            { data: 'name' },
            { data: 'username' },
            { data: 'email' },
            { data: 'address.city' },
            { data: 'phone' },
            { data: 'website' }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/2.3.8/i18n/es-ES.json'
        }
    });
});
