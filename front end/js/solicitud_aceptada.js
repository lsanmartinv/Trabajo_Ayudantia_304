document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idPrestamo = urlParams.get('idPrestamo');
    console.log('ID del préstamo:', idPrestamo);

    async function getCuotas(prestamoId) {
        try {
            const url = `http://localhost:2000/historial-cuotas/${prestamoId}`;
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;
    
        } catch (error) {
            console.error('Error fetching cuotas:', error);
        }
    }

    async function renderCuotas(prestamoId) {
        try {
            const datos = await getCuotas(prestamoId);
            const { cuotas, datos: [{ rut, monto_total }] } = datos;

            const rutElement = document.querySelector('#rut');
            rutElement.textContent = rut;

            // Asegúrate de que monto_total sea un número antes de formatearlo
            const montoTotalNumerico = parseFloat(monto_total);
            const montoTotalElement = document.querySelector('#montoTotal');
            montoTotalElement.textContent = montoTotalNumerico.toLocaleString('es-CL', { minimumFractionDigits: 2 });
            
            const tbody = document.querySelector('#tabla_cuotas');

            cuotas.forEach((cuota, index) => {
                const tr = document.createElement('tr');
                
                // Indice
                const th = document.createElement('th');
                th.scope = 'row';
                th.textContent = index + 1;
                tr.appendChild(th);
                
                // Monto
                const tdMonto = document.createElement('td');
                const montoCuotaNumerico = parseFloat(cuota.monto_cuota);
                tdMonto.textContent = montoCuotaNumerico.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                tr.appendChild(tdMonto);
                
                // Estado
                const tdEstado = document.createElement('td');
                tdEstado.textContent = cuota.estado_cuota;
                tr.appendChild(tdEstado);

                // Fecha de pago
                const tdFechaPago = document.createElement('td');
                tdFechaPago.textContent = cuota.fecha_pago.split('T')[0];
                tr.appendChild(tdFechaPago);
                
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error al renderizar las cuotas:', error);
        }
    }

    await renderCuotas(idPrestamo);
});

function toggleRows() {
    const rows = document.querySelectorAll('#tablaCuotas tbody tr:nth-child(n+4)');
    const button = document.querySelector('.btn.btn-primary');
    
    let isHidden = rows[0].classList.contains('hidden');
    rows.forEach(row => {
        row.classList.toggle('hidden', !isHidden);
    });
    
    button.textContent = isHidden ? "Mostrar menos" : "Mostrar más";
}

window.onload = function() {
    const allRows = document.querySelectorAll('#tablaCuotas tbody tr');
    const btnMostrarMas = document.getElementById('btnMostrarMas');
    
    if (allRows.length > 3) {
        for (let i = 3; i < allRows.length; i++) {
            allRows[i].classList.add('hidden');
        }
    } else {
        // Ocultar el botón si hay 3 o menos filas
        btnMostrarMas.style.display = 'none';
    }
};
