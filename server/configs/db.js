const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

var config = {
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD, // In defualt, XAMPP have no password
    port: process.env.DATABASE_PORT,
    db: process.env.DATABASE,
  },
};

module.exports = config;
