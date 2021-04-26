module.exports = {
  development: {
    username: 'postgres',
    password: 'psw1234',
    database: 'DRM',
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'psw1234',
    database: 'DRM_test',
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    logging: null
  },
  production: process.env.DATABASE_URL
};
