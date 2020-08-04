import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SharedProp } from './sharedProp.helper';
import { CategoriesPostsEntity } from './categoriesPosts.entity';

@Entity({ name: 'categories' })
export class CategoriesEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @OneToMany(
    () => CategoriesPostsEntity,
    (categoriesPosts: CategoriesPostsEntity) => categoriesPosts.category
  )
  categoriesPosts: Array<CategoriesPostsEntity>;
}
