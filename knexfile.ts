import type { Knex } from "knex";
require('dotenv/config');

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.CLIENT,
    connection: {
      host: process.env.HOST,
      port: Number(process.env.PORT),
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    },
  }
}

module.exports = config;
