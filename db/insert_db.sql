INSERT INTO empleado (rut, nombre, apellido, email, telefono, direccion, comuna, fecha_nacimiento, fecha_contratacion, cargo)
VALUES
('12345678-9', 'Juan', 'Pérez', 'juan.perez@example.com', '912345678', 'Calle Falsa 123', 'El Bosque', '1985-01-15', '2010-06-01', 'Analista'),
('13456789-0', 'María', 'Gómez', 'maria.gomez@example.com', '917645679', 'Avenida Siempreviva 456', 'Conchalí', '1990-02-20', '2012-08-15', 'Ingeniera'),
('14567890-1', 'Luis', 'Martínez', 'luis.martinez@example.com', '914345680', 'Calle Sol 789', 'Maipú', '1980-03-25', '2008-01-10', 'Gerente'),
('15678901-2', 'Ana', 'López', 'ana.lopez@example.com', '912345681', 'Avenida Luna 101', 'Lo Espejo', '1987-04-30', '2011-11-05', 'Contadora'),
('16789012-3', 'Carlos', 'García', 'carlos.garcia@example.com', '952345682', 'Calle Estrella 202', '	La Florida', '1993-05-10', '2015-09-20', 'Técnico'),
('17890123-4', 'Elena', 'Rodríguez', 'elena.rodriguez@example.com', '917845683', 'Avenida Mar 303', 'Huechuraba', '1992-06-15', '2013-07-25', 'Secretaria'),
('18901234-5', 'José', 'Hernández', 'jose.hernandez@example.com', '914345684', 'Calle Río 404', 'Cerro Navia', '1988-07-20', '2009-04-30', 'Vendedor'),
('17012345-6', 'Lucía', 'Fernández', 'lucia.fernandez@example.com', '915345685', 'Avenida Lago 505', 'La Granja', '1993-08-25', '2014-03-10', 'Asistente'),
('10123456-7', 'Miguel', 'Sánchez', 'miguel.sanchez@example.com', '987345686', 'Calle Bosque 606', 'Macul', '1991-09-30', '2012-12-01', 'Supervisor'),
('9234567-8', 'Sofía', 'Ramírez', 'sofia.ramirez@example.com', '998745687', 'Avenida Campo 707', 'Renca', '1994-10-05', '2016-01-15', 'Recepcionista'),
('10345678-9', 'Pedro', 'Morales', 'pedro.morales@example.com', '905623488', 'Calle Montaña 808', '	Recoleta', '1986-11-10', '2010-02-01', 'Analista'),
('11456789-0', 'Isabel', 'Torres', 'isabel.torres@example.com', '926045689', 'Avenida Río 909', 'Renca', '1989-12-15', '2011-03-15', 'Ingeniera'),
('12567890-1', 'Javier', 'Guzmán', 'javier.guzman@example.com', '956245690', 'Calle Mar 1010', 'Peñalolén', '1987-01-20', '2009-04-10', 'Gerente'),
('15178901-2', 'Carmen', 'Ruiz', 'carmen.ruiz@example.com', '964545691', 'Avenida Sol 111', 'El Bosque', '1990-02-25', '2012-05-05', 'Contadora'),
('14789012-3', 'Francisco', 'Romero', 'francisco.romero@example.com', '987845692', 'Calle Luna 222', 'Pudahuel', '1992-03-30', '2013-06-20', 'Técnico'),
('13890123-4', 'Teresa', 'Vargas', 'teresa.vargas@example.com', '916545693', 'Avenida Estrella 333', 'Quilicura', '1993-04-05', '2014-07-25', 'Secretaria'),
('12901234-5', 'Sergio', 'Ortiz', 'sergio.ortiz@example.com', '919355694', 'Calle Mar 444', 'Vitacura', '1991-05-10', '2012-08-30', 'Vendedor'),
('7012345-6', 'Rosa', 'Medina', 'rosa.medina@example.com', '914755695', 'Avenida Río 555', 'Lo Prado', '1994-06-15', '2015-09-10', 'Asistente'),
('8123456-7', 'Ricardo', 'Castillo', 'ricardo.castillo@example.com', '985245696', 'Calle Sol 666', 'Macul', '1995-07-20', '2016-10-01', 'Supervisor'),
('19234567-8', 'Patricia', 'Aguilar', 'patricia.aguilar@example.com', '996485697', 'Avenida Luna 777', 'Maipú', '1996-08-25', '2017-11-15', 'Recepcionista');

INSERT INTO prestamo_tipos (tipo_prestamo, descripcion, cuotas, tasa_interes)
VALUES
('Hipotecario', 'Préstamo para la compra de una vivienda', 120, 3.75),
('Automotriz', 'Préstamo para la compra de un automóvil', 60, 4.25),
('Educativo', 'Préstamo para estudios universitarios', 48, 4.00),
('Viaje', 'Préstamo para vacaciones y viajes', 12, 6.00),
('Salud', 'Préstamo para gastos médicos', 24, 5.00),
('Renovación Hogar', 'Préstamo para mejoras en el hogar', 36, 4.75),
('Tecnología', 'Préstamo para la compra de tecnología', 24, 5.25),
('Boda', 'Préstamo para gastos de boda', 24, 5.75),
('Proyecto', 'Préstamo para financiar un proyecto', 240, 3.20),
('Consolidación', 'Préstamo para consolidar deudas', 36, 4.50);
