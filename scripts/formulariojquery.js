window.onload = function(){
    const formulario = $('#formularioRegistro');
    const elementosAlerta = formulario.querySelectorAll('.alert');

    elementosAlerta.forEach((elemento) => {
        elemento.style.display = 'none';
    });
};

function validarFormulario() {
    const inputNombre = $('#inputNombre');
    const inputEmail = $('#inputEmail');
    const inputRut = $('#inputRut');
    const inputFechaNacimiento = $('#inputFechaNacimiento');
    const selectGenero = $('#selectGenero');
    const inputDireccion = $('#inputDireccion');
    const selectNacionalidad = $('#selectNacionalidad');
    const inputFoto = $('#inputFoto');
    const inputContrasena = $('#inputContrasena');
    const inputRepetirContrasena = $('#inputRepetirContrasena');

    const alertaNombre = $('#alertaNombre');
    let formularioValido = true;

    if (!validarInput(inputNombre)) {
        formularioValido = false;
    };

    if (!validarEmail(inputEmail)) {
        formularioValido = false;
    };

    if (!validarRutInput(inputRut)) {
        formularioValido = false;
    };

    
    if (!validarInput(inputFechaNacimiento)) {
        formularioValido = false;
    };

    if (!validarInput(selectGenero)) {
        formularioValido = false;
    };

    if (!validarInput(inputDireccion)) {
        formularioValido = false;
    };

    if (!validarInput(selectNacionalidad)) {
        formularioValido = false;
    };

    if (!validarFoto(inputFoto)) {
        formularioValido = false;
    };

    if (!validarInput(inputContrasena) || !validarContrasenaSegura(inputContrasena)) {
        formularioValido = false;
    };

    if (!validarInput(inputRepetirContrasena)) {
    formularioValido = false;
    } else {
    
    if (inputContrasena.value !== inputRepetirContrasena.value) {
        alertaRepetirContrasena.style.display = 'block';
        alertaRepetirContrasena.textContent = 'Las contraseñas no coinciden.';
        inputRepetirContrasena.classList.add('is-invalid');
        inputRepetirContrasena.classList.remove('is-valid');
        formularioValido = false;
    } else {
        // Si no está vacío y además sí coincide
        alertaRepetirContrasena.style.display = 'none';
        inputRepetirContrasena.classList.remove('is-invalid');
        inputRepetirContrasena.classList.add('is-valid');
    }
};


    if (formularioValido) {
        alert('Formulario Válido!\nEnviando datos al servidor!')
    } else {
        alert('Formulario Inválido!\nRevise los campos en rojo!.')
    }
};

function validarInput(input) {
    if (input.value == '') {
        input.nextElementSibling.style.display = 'block';
        input.nextElementSibling.textContent = 'Campo Obligatorio!';
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    } else {
        input.nextElementSibling.style.display = 'none';
        input.nextElementSibling.textContent = '';
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    };
};

function validarEmail(input) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (validarInput(input)) {
        if (regexEmail.test(input.value)) {
            input.nextElementSibling.style.display = 'none';
            input.nextElementSibling.textContent = '';
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            return true;
        } else {
            input.nextElementSibling.style.display = 'block';
            input.nextElementSibling.textContent = 'Correo Inválido!';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        }
    }
};

function validarContrasenaSegura(input) {
    const regexContrasenaSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (regexContrasenaSegura.test(input.value)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
};

function validarFoto(input) {
    if (validarInput(input)) {
        const tiposPermitidos = [
            'image/jpeg',
            'image/png'
        ];
        const archivo = input.files[0];
        if (archivo) {
            if (tiposPermitidos.includes(archivo.type)) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                return true;
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                return false;
            }
        }
    }
};

function limpiarFormulario() {
    const formulario = document.getElementById('formularioRegistro');
    formulario.querySelectorAll('input, select').forEach(elemento => elemento.value = '');
    formulario.querySelectorAll('input, select').forEach(elemento => elemento.classList.remove('is-valid', 'is-invalid'));
};

// function calcularDigitoVerificador(rutNumero) { //Función para calcular el dígito verificador del RUT chileno
//   // Convertir a string y asegurar que tenga 8 dígitos
//   let rut = String(rutNumero).padStart(8, '0');
  
//   // Variables para el cálculo
//   let suma = 0;
//   let multiplicador = 2;
  
//   // Recorrer de derecha a izquierda
//   for (let i = rut.length - 1; i >= 0; i--) {
//     suma += parseInt(rut[i]) * multiplicador;
//     multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
//   }
  
//   // Calcular dígito verificador
//   const resto = suma % 11;
//   const dv = 11 - resto;
  
//   // Casos especiales
//   if (dv === 11) return '0';
//   if (dv === 10) return 'K';
//   return String(dv);
// };

class RutValidator {
  /**
   * Limpia el RUT removiendo puntos, guiones y espacios
   * @param {string} rut - RUT en cualquier formato
   * @returns {string} RUT limpio
   */
  static limpiar(rut) {
    return String(rut).replace(".",'').replace('-','').toUpperCase();
  }

  /**
   * Formatea el RUT con puntos y guión
   * @param {string} rut - RUT sin formato
   * @returns {string} RUT formateado (ej: 12.345.678-9)
   */
  static formatear(rut) {  
    const rutLimpio = this.limpiar(rut);
    if (rutLimpio.length < 2) return rutLimpio; 
    
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
    
    // Agregar puntos cada 3 dígitos de derecha a izquierda
    let cuerpoFormateado = '';
    for (let i = cuerpo.length - 1, j = 0; i >= 0; i--, j++) {
      if (j > 0 && j % 3 === 0) {
        cuerpoFormateado = '.' + cuerpoFormateado;
      }
      cuerpoFormateado = cuerpo[i] + cuerpoFormateado;
    }
    
    return `${cuerpoFormateado}-${dv}`;
  }

  /**
   * Calcula el dígito verificador
   * @param {string|number} rutNumero - Número del RUT sin DV
   * @returns {string} Dígito verificador
   */
  static calcularDV(rutNumero) { 
    const rut = String(rutNumero).padStart(8, '0');
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = rut.length - 1; i >= 0; i--) {
      suma += parseInt(rut[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const dv = 11 - (suma % 11);
    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return String(dv);
  }

  /**
   * Valida un RUT completo
   * @param {string} rut - RUT completo con o sin formato
   * @returns {boolean} true si es válido
   */
  static validar(rut) {
    const rutLimpio = this.limpiar(rut);
    
    // Validar largo mínimo
    if (rutLimpio.length < 2) return false;
    
    // Separar número y dígito verificador
    const numero = rutLimpio.slice(0, -1);
    const dvIngresado = rutLimpio.slice(-1);
    
    // Validar que sea un número
    if (!/^\d+$/.test(numero)) return false;
    
    // Calcular DV esperado y comparar
    const dvCalculado = this.calcularDV(numero);
    return dvIngresado === dvCalculado;
  }
}

//Se solucionó el problema de validación de Rut usando la herramienta de desarrollador en microsoft edge
//y se revisó linea por linea el código, se encontró que la función limpiar estaba

function validarRutInput(input) {
    if (validarInput(input)) { // Primero verifica que no esté vacío
        const rutValor = input.value;
        
        if (RutValidator.validar(rutValor)) {
            // Si es válido, lo formateamos automáticamente con puntos y guión
            input.value = RutValidator.formatear(rutValor); 
            
            input.nextElementSibling.style.display = 'none';
            input.nextElementSibling.textContent = '';
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            return true;
        } else {
            // Si es inválido, mostramos el error
            input.nextElementSibling.style.display = 'block';
            input.nextElementSibling.textContent = 'RUT Inválido! Use el formato correcto.';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        }
    }
    return false;
}

