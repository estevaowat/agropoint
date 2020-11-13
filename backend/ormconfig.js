const { join } = require('path');

const rootDir = process.env.NODE_ENV === "development" ? 'src' : 'build'

module.exports = [
  {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "agropoint",
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
