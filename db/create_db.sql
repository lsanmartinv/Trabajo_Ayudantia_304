DROP DATABASE ayudantia;

CREATE DATABASE ayudantia;

USE ayudantia;

CREATE TABLE empleado (
    rut VARCHAR(12) NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono INT(9) NOT NULL,
    direccion VARCHAR(100),
    comuna VARCHAR(50),
    fecha_nacimiento DATE,
    fecha_contratacion DATE,
    cargo VARCHAR(100)
);

CREATE TABLE prestamo_tipos (
    tipo_prestamo_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_prestamo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100),
    cuotas INT NOT NULL,
    tasa_interes DECIMAL(5,2) NOT NULL
);

CREATE TABLE prestamo (
    prestamo_id INT AUTO_INCREMENT PRIMARY KEY,
    rut VARCHAR(12) NOT NULL, -- Empleado que solicita el préstamo
    tipo_prestamo_id INT NOT NULL, -- Tipo de préstamo solicitado
    monto DECIMAL(20,2) NOT NULL, -- Monto del préstamo
    monto_total DECIMAL(20,2) NOT NULL, -- Monto total a pagar
    fecha_otorgacion DATE NOT NULL, -- Fecha de otorgación del préstamo
    fecha_finalizacion DATE NOT NULL, -- Fecha de finalización del préstamo
    estado_prestamo ENUM('En Proceso', 'Pagado', 'Vencido') NOT NULL,
    FOREIGN KEY (rut) REFERENCES empleado(rut),
    FOREIGN KEY (tipo_prestamo_id) REFERENCES prestamo_tipos(tipo_prestamo_id)
);

CREATE TABLE cuotas (
    cuota_id INT AUTO_INCREMENT PRIMARY KEY,
    prestamo_id INT NOT NULL,
    monto_cuota DECIMAL(10,2) NOT NULL,
    estado_cuota ENUM('No pagado', 'Pagado', 'Vencido') NOT NULL,
    fecha_pago DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    FOREIGN KEY (prestamo_id) REFERENCES prestamo(prestamo_id)
);
