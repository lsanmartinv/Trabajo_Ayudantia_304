-- Insertar un nuevo prestamo
INSERT INTO prestamo (rut, tipo_prestamo_id, monto, monto_total, fecha_otorgacion, fecha_finalizacion, estado_prestamo)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- Insertar cuotas
INSERT INTO cuotas (prestamo_id, monto_cuota, estado_cuota, fecha_pago, fecha_vencimiento)
VALUES (?, ?, ?, ?, ?);