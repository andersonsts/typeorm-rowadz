import { Connection, Repository, Raw } from 'typeorm';
import { name, internet, random, date, lorem, hacker } from 'faker';
import { UserEntity, PostsEntity, CategoriesEntity, CategoriesPostsEntity } from '../entities';
import { writeFileSync } from 'fs';

const createUsers = async (con: Connection) => {
  const users: Array<UserEntity> = [];
  for(const _ of Array.from({ length: 10 })) {
    const firstName = name.firstName();
    const lastName = name.lastName();
    const isActive = random.arrayElement([true, false]);
    const email = internet.email();
    const password = internet.password();
    const birthDate = date.past();

    const user: Partial<UserEntity> = new UserEntity(firstName, lastName, isActive, email, birthDate, password);

    users.push(await con.manager.save(user) as UserEntity);
  }
  await createPosts(con, users);
}

const createPosts = async (con: Connection, users: Array<UserEntity>) => {
  const posts: Array<PostsEntity> = [];
  for(const user of users) {
    const body = lorem.paragraph();
    const post1 = new PostsEntity(body);
    const post2 = new PostsEntity(body);
    post1.user = user;
    post2.user = user;
    posts.push((await con.manager.save(post1)) as PostsEntity);
    posts.push((await con.manager.save(post2)) as PostsEntity);
  }
  await readUsers(con);
  await manyToManyCreate(con, posts);
}

const readUsers = async (con: Connection) => {
  const userRepository: Repository<UserEntity> = con.getRepository(UserEntity);
  // const data = await userRepository.find();
  // const data = await userRepository.find({
  //   order: { birthDate: 'ASC' },
  //   select: ['firstName', 'birthDate', 'email', 'id'],
  //   // where: { firstName: 'firstName_procurado' }
  // });
  // const data = await userRepository.find({ take: 2, skip: 6 }); // pule 6 registros e pegue os proximos 2.
  // const data = await userRepository.findOne(8);
  // const data = await userRepository.find({ where: { firstName: 'road' } });
  // const data = await userRepository.find({ where: { age: ' > 12' } });
  // const data = await userRepository.find({ relations: ['posts'] });
  // writeFileSync('data.json', JSON.stringify(data, null, 2));
}

const manyToManyCreate = async (con: Connection, posts: Array<PostsEntity>) => {
  await createCat(con);
  const categoriesRepository: Repository<CategoriesEntity> = con.getRepository(CategoriesEntity);
  const categoriesPostsRepository: Repository<CategoriesPostsEntity> = con.getRepository(
    CategoriesPostsEntity
  );
  const categories: Array<CategoriesEntity> = await categoriesRepository.find();
  for(const post of posts) {
    const someColumn = hacker.adjective();
    const catPost = new CategoriesPostsEntity(someColumn, post, random.arrayElement(categories));
    await categoriesPostsRepository.save(catPost);
  }
}

const createCat = async (con: Connection) => {
  const categoriesRepository: Repository<CategoriesEntity> = con.getRepository(
    CategoriesEntity
  );
  for(const _ of Array.from({ length: 10 })) {
    const label = hacker.verb();
    const categoryToSave: Partial<CategoriesEntity> = new CategoriesEntity(
      label
    );
    await categoriesRepository.save(categoryToSave);
  }
}

export { createUsers };
