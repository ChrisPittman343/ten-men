const config = {
  secret: process.env.SECRET,
  port: process.env.PORT,
  dev: process.env.NODE_ENV === "development",
  password: process.env.PASSWORD,
  postgresConnection: process.env.DATABASE_URL + "?sslmode=require",
  localConnection: process.env.LOCAL_PG,
};

module.exports = config;
