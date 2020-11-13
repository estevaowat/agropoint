const { join } = require('path');

const rootDir = process.env.NODE_ENV === "development" ? 'src' : 'build'

module.exports = [
  {
    "name": "default",
    "type": process.env.DB_TYPE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "entities": [
      join(__dirname, rootDir, 'app/models', '*.{ts,js}')
    ],
    "migrations": [
      join(__dirname, rootDir, 'app/databases/migrations', '*.{ts,js}')
    ],
    "cli": {
      "entitiesDir": `${rootDir}/app/models`,
      "migrationsDir": `${rootDir}/app/databases/migrations`
    }
  }
]
