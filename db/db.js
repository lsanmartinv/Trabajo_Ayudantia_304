import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'mysqldb',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ayudantia'
});
