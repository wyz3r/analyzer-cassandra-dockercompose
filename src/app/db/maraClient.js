import mariadb from 'mariadb'

export const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'dummy',
  connectionLimit: 5
})
