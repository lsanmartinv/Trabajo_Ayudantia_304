import express from 'express';
import cors from 'cors';
import { db } from './db/db.js';

const app = express();

// app.get -> Mostrar pagina
// app.post -> Enviar informacion al servidor o base de datos

// middleware
app.use(cors());
app.use(express.json());

app.get('/test_db', async (req, res) => {
  const result = await db.query('SELECT NOW();');
  res.send(result[0]);
});

app.get('/empleados', async (req, res) => {
  console.log('Usuario accediendo a la ruta /empleados');

  const [empleados] = await db.query("SELECT rut FROM empleado;");

  res.send(empleados);
});

app.post('/verificar-prestamo', async (req, res) => {
  const { rut } = req.body;
  console.log('Usuario verificando el préstamo del empleado con rut:', rut);

  try {
    const [resultado] = await db.query("SELECT estado_prestamo FROM prestamo WHERE rut = ? ORDER BY fecha_otorgacion DESC LIMIT 1", [rut]);

    const estado_prestamo = resultado.length > 0 ? resultado[0].estado_prestamo : null;

    if (estado_prestamo === null) {
      console.log('El empleado no tiene préstamos hechos.');
    } else {
      console.log('Estado del último préstamo:', estado_prestamo);
    }

    if (estado_prestamo === 'En Proceso' || estado_prestamo === 'Vencido') {
      res.status(400).send({ mensaje: "El empleado ya tiene un préstamo vigente." });
    } else {
      res.send({ mensaje: "Préstamo registrado exitosamente." });
    }
  } catch (error) {
    console.error("Error al verificar el préstamo del empleado:", error);
    res.status(500).send({ mensaje: "Error al procesar la solicitud." });
  }
});

app.get('/prestamos', async (req, res) => {
  console.log('Usuario accediendo a la ruta /prestamos');

  const [prestamos] = await db.query("SELECT * FROM prestamo_tipos;");

  res.send(prestamos);
});

app.post('/registrar-prestamo', async (req, res) => {
  const { rut_empleado, tipo_prestamo, monto_prestamo, numero_cuotas } = req.body;
  console.log('Usuario realizando un prestamo con rut:', rut_empleado);

  const select_db = 'SELECT tipo_prestamo_id, tasa_interes FROM prestamo_tipos WHERE tipo_prestamo = ?;';
  const [result] = await db.query(select_db, [tipo_prestamo]);
  
  const montoPrestamoNumerico = Number(monto_prestamo.replace(/\./g, ''));

  const tipoPrestamoId = result[0].tipo_prestamo_id;
  const tasaInteres = result[0].tasa_interes;
  const tasaInteresDecimal = parseFloat(tasaInteres) / 100;

  const tasa_mensual = tasaInteresDecimal / 12;
  const cuota_mensual = (montoPrestamoNumerico * tasa_mensual * (1 + tasa_mensual)**numero_cuotas) / (((1 + tasa_mensual)**numero_cuotas) - 1);
  const total_monto = cuota_mensual * numero_cuotas;

  let fecha_creacion = new Date();
  let fecha_termino = new Date(fecha_creacion);

  fecha_termino.setMonth(fecha_termino.getMonth() + 1);
  fecha_termino.setDate(4);
  fecha_termino.setMonth(fecha_termino.getMonth() + numero_cuotas);

  function formatearFecha(fecha) {
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  fecha_creacion = formatearFecha(fecha_creacion);
  fecha_termino = formatearFecha(fecha_termino);

  const insert_db = 'INSERT INTO prestamo (rut, tipo_prestamo_id, monto, monto_total, fecha_otorgacion, fecha_finalizacion, estado_prestamo) VALUES (?, ?, ?, ?, ?, ?, ?);';

  await db.query(insert_db, [rut_empleado, tipoPrestamoId, montoPrestamoNumerico, total_monto, fecha_creacion, fecha_termino, 'En Proceso']);

  const [prestamoResult] = await db.query('SELECT LAST_INSERT_ID() as id_prestamo;');
  const id_prestamo = prestamoResult[0].id_prestamo;

  let fecha_mes = new Date();
  fecha_mes.setMonth(fecha_mes.getMonth() + 1);
  fecha_mes.setDate(5);

  let fecha_vencimiento = new Date(fecha_mes);
  fecha_vencimiento.setDate(4);

  const insert_db_cuotas = 'INSERT INTO cuotas (prestamo_id, monto_cuota, estado_cuota, fecha_pago, fecha_vencimiento) VALUES (?, ?, ?, ?, ?);';

  for (let i = 0; i < numero_cuotas; i++) {
    fecha_vencimiento.setMonth(fecha_vencimiento.getMonth() + 1);
    await db.query(insert_db_cuotas, [id_prestamo, cuota_mensual, 'No pagado', formatearFecha(fecha_mes), formatearFecha(fecha_vencimiento)]);
    fecha_mes.setMonth(fecha_mes.getMonth() + 1);
  }

  res.json({ mensaje: 'Préstamo registrado', id_prestamo: id_prestamo });
});

app.get('/historial-cuotas/:prestamo_id', async (req, res) => {
  const { prestamo_id } = req.params;
  console.log('Usuario accediendo a la ruta /historial-cuotas/', prestamo_id);

  const [cuotas] = await db.query('SELECT * FROM cuotas WHERE prestamo_id = ?;', [prestamo_id]);
  const [datos] = await db.query('SELECT rut, monto_total FROM prestamo WHERE prestamo_id = ?;', [prestamo_id]);
  
  res.send({ cuotas, datos });
});

app.listen(2000, () => {
  console.log('Servidor escuchando en el puerto 2000');
});
