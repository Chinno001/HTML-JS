$(document).ready(function () {
    $('.alert').each(function () {
        $(this).hide();
    });
});

function validarFormulario() {
    const inputNombre = $('#inputNombre');
    const inputUsuario = $('#inputUsuario');
    const inputFechaIngreso = $('#inputFechaIngreso');
    const inputEmail = $('#inputEmail');
    const inputSitioWeb = $('#inputSitioWeb');

    let formularioValido = true;

    if (!validarInput(inputNombre)) {
        formularioValido = false;
    };

    if (!validarInput(inputUsuario)) {
        formularioValido = false;
    };

    if (!validarFecha(inputFechaIngreso)) {
        formularioValido = false;
    };

    if (!validarEmail(inputEmail)) {
        formularioValido = false;
    };

    // Sitio Web no es obligatorio, pero si viene con algo escrito debe tener formato válido
    if (!validarSitioWeb(inputSitioWeb)) {
        formularioValido = false;
    };

    if (formularioValido) {
        alert('Formulario Válido!\nEnviando datos al servidor!');
        limpiarFormulario();
        window.location.href = './index.html';
    } else {
        alert('Formulario Inválido!\nRevise los campos en rojo!.');
    }
};

// Valida que el campo no esté vacío (uso genérico para campos obligatorios de texto)
function validarInput(input) {
    if (input.val() == '') {
        input.next().show();
        input.next().text('Campo Obligatorio!');
        input.removeClass('is-valid');
        input.addClass('is-invalid');
        return false;
    } else {
        input.next().hide();
        input.next().text('');
        input.removeClass('is-invalid');
        input.addClass('is-valid');
        return true;
    };
};

// La Fecha Ingreso es obligatoria y se valida con el formato dd/mm/yyyy
function validarFecha(input) {
    if (input.val() == '') {
        input.next().show();
        input.next().text('Campo Obligatorio!');
        input.removeClass('is-valid');
        input.addClass('is-invalid');
        return false;
    }

    // El input type="date" siempre entrega el valor en formato ISO (yyyy-mm-dd)
    const regexFechaISO = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexFechaISO.test(input.val())) {
        input.next().show();
        input.next().text('Formato de fecha inválido! Use dd/mm/yyyy.');
        input.removeClass('is-valid');
        input.addClass('is-invalid');
        return false;
    }

    input.next().hide();
    input.next().text('');
    input.removeClass('is-invalid');
    input.addClass('is-valid');
    return true;
};

// Email obligatorio, valida formato usuario@servidor.com
function validarEmail(input) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (validarInput(input)) {
        if (regexEmail.test(input.val())) {
            input.next().hide();
            input.next().text('');
            input.removeClass('is-invalid');
            input.addClass('is-valid');
            return true;
        } else {
            input.next().show();
            input.next().text('Correo Inválido! Formato esperado: usuario@servidor.com');
            input.removeClass('is-valid');
            input.addClass('is-invalid');
            return false;
        }
    }
    return false;
};

// Sitio Web NO es obligatorio, solo se valida el formato si el usuario escribió algo
function validarSitioWeb(input) {
    if (input.val() == '') {
        input.next().hide();
        input.next().text('');
        input.removeClass('is-invalid', 'is-valid');
        return true;
    }

    const regexUrl = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([/\w .-]*)*\/?$/;
    if (regexUrl.test(input.val())) {
        input.next().hide();
        input.next().text('');
        input.removeClass('is-invalid');
        input.addClass('is-valid');
        return true;
    } else {
        input.next().show();
        input.next().text('URL Inválida! Formato esperado: https://www.sitio.com');
        input.removeClass('is-valid');
        input.addClass('is-invalid');
        return false;
    }
};

function limpiarFormulario() {
    const formulario = $('#formularioRegistro');
    formulario.find('input').val('');
    formulario.find('input').removeClass('is-valid is-invalid');
    formulario.find('.alert').hide();
};