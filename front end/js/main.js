async function getEmpleados() {
  try {
    const response = await fetch('http://localhost:2000/empleados');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching empleados:', error);
  }
}

async function getPrestamos() {
  try {
    const response = await fetch('http://localhost:2000/prestamos');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching prestamos:', error);
  }
}

async function renderEmpleados() {
  try {
    const empleados = await getEmpleados();
    const empleadosLista = document.querySelector('#empleados-lista');

    if (empleados && empleadosLista) {
      empleados.forEach(empleado => {
        const option = document.createElement('option');
        option.value = empleado.rut;
        option.textContent = empleado.rut;
        empleadosLista.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error rendering empleados:', error);
  }
}

async function renderPrestamos() {
  try {
    const prestamos = await getPrestamos();
    const prestamosLista = document.querySelector('#prestamos-lista');

    if (prestamos && prestamosLista) {
      prestamos.forEach(prestamo => {
        const option = document.createElement('option');
        option.value = prestamo.tipo_prestamo;
        option.textContent = prestamo.tipo_prestamo;
        prestamosLista.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error rendering prestamos:', error);
  }
}

async function tomarCuota() {
  try {
    const prestamos = await getPrestamos();

    // Tomar el valor del input de tipo_prestamo que eligió el usuario
    const tipoPrestamo = document.querySelector('#prestamos-lista').value;

    // Buscar la cuota correspondiente al tipo de préstamo
    const prestamo = prestamos.find(prestamo => prestamo.tipo_prestamo === tipoPrestamo);

    const cuotaElement = document.querySelector('#cuota');
    cuotaElement.textContent = prestamo.cuotas;

    const interesElement = document.querySelector('#interes');
    interesElement.textContent = prestamo.tasa_interes + '%';

    return prestamo.cuotas;
  } catch (error) {
    console.error('Error tomando cuota:', error);
  }
}

// Acciones en el formulario
document.addEventListener('DOMContentLoaded', async function() {
  var rutEmpleados = document.querySelector('#empleados-lista');
  var tipoPrestamo = document.querySelector('#prestamos-lista');
  var montoPrestamo = document.querySelector('#monto_prestamo');
  var numeroCuotas = document.querySelector('#numero_cuotas');
  var boton = document.querySelector('button[type="submit"]');
  var check_rut = false;
  var check_prestamo = false;
  var check_monto = false;
  var check_cuotas = false;

  let cuota_maxima;

  const cuotaElement = document.querySelector('#cuota');
  const interesElement = document.querySelector('#interes');

  function actualizarEstadoBoton() {
    boton.disabled = !(check_rut && check_prestamo && check_monto && check_cuotas);
  }

  rutEmpleados.addEventListener('change', function() {
    var optionFound = this.value !== 'Seleccione el RUT';
    check_rut = optionFound;
    actualizarEstadoBoton();
  });

  tipoPrestamo.addEventListener('change', async function() {
    var optionFound = this.value !== 'Seleccione un Préstamo';

    montoPrestamo.disabled = !optionFound;
    
    if (!optionFound) {
        cuotaElement.textContent = '';
        interesElement.textContent = '';
        montoPrestamo.value = '';
        numeroCuotas.value = '';
        numeroCuotas.disabled = true;
        check_prestamo = false;
    } else {
        cuota_maxima = await tomarCuota();
        check_prestamo = true;
        check_monto = false;
        check_cuotas = false;
        numeroCuotas.disabled = true;
        montoPrestamo.value = '';
        numeroCuotas.value = '';
    }
    actualizarEstadoBoton();
  });

  montoPrestamo.addEventListener('input', function() {
    montoPrestamo.value = montoPrestamo.value.replace(/[^\d]/g, '').slice(0, 8);
    montoPrestamo.value = montoPrestamo.value.replace(/^0+/, '');

    numeroCuotas.disabled = montoPrestamo.value === '';
    
    if (montoPrestamo.value === '') {
      numeroCuotas.value = '';
      check_monto = false;
    } else {
      check_monto = true;
      montoPrestamo.value = Number(montoPrestamo.value).toLocaleString();
    }
    actualizarEstadoBoton();
  });

  numeroCuotas.addEventListener('input', async function() {
    // Elimina caracteres no numéricos y limita a 3 dígitos
    numeroCuotas.value = numeroCuotas.value.replace(/[^\d]/g, '').slice(0, 3);
    // Elimina ceros al inicio que no sean parte de un número válido
    numeroCuotas.value = numeroCuotas.value.replace(/^0+/, '');

    var alerta_cuota = document.getElementById('alerta_cuota');

    if (numeroCuotas.value === '' || Number(numeroCuotas.value) > cuota_maxima || Number(numeroCuotas.value) === 0) {
      alerta_cuota.style.display = 'block';
      if (numeroCuotas.value === '') { alerta_cuota.style.display = 'none'; }
      check_cuotas = false;
    } else {
      alerta_cuota.style.display = 'none';
      check_cuotas = true;
    }
    actualizarEstadoBoton();
  });
});

document.addEventListener('submit', async function(event) {
  event.preventDefault();

  const rutEmpleado = document.querySelector('#empleados-lista').value;
  const tipoPrestamo = document.querySelector('#prestamos-lista').value;
  const montoPrestamo = document.querySelector('#monto_prestamo').value;
  const numeroCuotas = document.querySelector('#numero_cuotas').value;

  // Verificar si el empleado tiene préstamos vigentes
  const verificacion = await fetch('http://localhost:2000/verificar-prestamo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rut: rutEmpleado })
  });

  const resultadoVerificacion = await verificacion.json();

  if (!verificacion.ok) {
    alert(resultadoVerificacion.mensaje); // Muestra el mensaje de error de la verificación
    return; // Detiene la ejecución si hay un préstamo vigente
  } else {
    // Proceder con el registro del préstamo si no hay préstamos vigentes
    const response = await fetch('http://localhost:2000/registrar-prestamo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rut_empleado: rutEmpleado,
        tipo_prestamo: tipoPrestamo,
        monto_prestamo: montoPrestamo,
        numero_cuotas: numeroCuotas
      })
    });

    if (!response.ok) {
      console.error('Error registrando prestamo:', response);
    } else {
      const data = await response.json();
      const idPrestamo = data.id_prestamo;
      alert(resultadoVerificacion.mensaje);
      window.location.href = `solicitud_aceptada.html?idPrestamo=${idPrestamo}`;
    }
  }
});

renderEmpleados();
renderPrestamos();
