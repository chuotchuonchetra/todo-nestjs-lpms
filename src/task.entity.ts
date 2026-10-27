import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;

  @Column({ default: 'medium' })
  priority: string;
}
