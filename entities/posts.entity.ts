import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SharedProp } from './sharedProp.helper';
import { UserEntity } from './users.entity';

@Entity({ name: 'posts' })
export class PostsEntity extends SharedProp {
  constructor(body: string) {
    super();
    this.body = body
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  body: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
