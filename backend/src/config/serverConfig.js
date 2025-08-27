const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.SERVER_PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
};
