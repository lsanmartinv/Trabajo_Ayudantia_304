use ayudantia;

SELECT * FROM empleado;
-- empleado_id, rut, nombre, apellido, email, 
-- telefono, direccion, comuna, fecha_nacimiento, fecha_contratacion, cargo
SELECT * FROM prestamo_tipos;
-- tipo_prestamo_id, tipo_prestamo, descripcion, cuotas, tasa_interes

-- Consulta de rut de empleados
SELECT rut FROM empleado;

-- Verificar si un rut existe en la tabla Empleados
SELECT rut FROM empleado WHERE rut = ?;

-- Consultar tipo de prestamo que existen
SELECT tipo_prestamo FROM prestamo_tipos;

-- Consultar id y tasa_interes de tipo de prestamo
SELECT tipo_prestamo_id, tasa_interes FROM prestamo_tipos WHERE tipo_prestamo = ?;

-- Consultar el rut del empleado y el monto_total a traves de prestamo_id
SELECT rut, monto_total FROM prestamo
WHERE prestamo_id = ?;

-- Consultar si el rut tiene un prestamo activo
SELECT estado_prestamo FROM prestamo WHERE rut = ?;