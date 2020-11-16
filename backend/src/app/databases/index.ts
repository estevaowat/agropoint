import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

class Connection {
  private nameConnection = process.env.NODE_ENV === 'test' ? 'test' : 'default';

  async create() {
    const connectionOptions = await getConnectionOptions(this.nameConnection);
    await createConnection(connectionOptions);
  }

  async close() {
    await getConnection(this.nameConnection).close();
  }

  async clear() {
    const connection = getConnection(this.nameConnection);
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  }
}

export default new Connection();
