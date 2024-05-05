require("dotenv").config();

module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  MYSQL_ROOT_HOST: "localhost",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};