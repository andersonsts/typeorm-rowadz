import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { UserEntity, PostsEntity } from './entities';
import { createUsers } from './crud';

const app = async () => {
  const connection: Connection = await createConnection({
    type: 'sqlite',
    database: './db/testing_typeorm.db',
    entities: [UserEntity, PostsEntity]
    // host: 'localhost',
    // port: 3306,
    // username: 'test',
    // password: 'test',
    // database: 'test',
  });
  await connection.synchronize(true);
  await createUsers(connection);
};

app();
