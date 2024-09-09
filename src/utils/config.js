const config = {
  postgres: {
    pgUser: process.env.PGUSER,
    pgHost: process.env.PGHOST,
    pgPassword: process.env.PGPASSWORD,
    pgDatabase: process.env.PGDATABASE,
    pgPort: process.env.PGPORT,
  },
  nodemailerSmtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
};

module.exports = config;
