require('dotenv').config();

const config = {
  port: process.env.PORT,
  connection: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  secret: process.env.SECRET,
};

export default config;
