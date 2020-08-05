import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import {
  UserEntity,
  PostsEntity,
  CategoriesEntity,
  CategoriesPostsEntity
} from './entities';
import { createUsers } from './crud';
import { CustomeLogger } from './logger';

const app = async () => {
  const connection: Connection = await createConnection({
    type: 'sqlite',
    database: './db/testing_typeorm.db',
    entities: [
      UserEntity,
      PostsEntity,
      CategoriesEntity,
      CategoriesPostsEntity
    ],
    logging: true,
    logger: new CustomeLogger(),
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
