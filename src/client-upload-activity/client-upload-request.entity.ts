import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientUploadRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  dir: string;
}
