import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({unique:true, nullable: true})
  email:string;
}