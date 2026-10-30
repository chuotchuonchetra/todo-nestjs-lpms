import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  // bcrypt hash, never the plain password. @Exclude() keeps it out of every response.
  @Exclude()
  @Column()
  passwordHash: string;
}
