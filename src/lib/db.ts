import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hmd_weld_robot_v2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
