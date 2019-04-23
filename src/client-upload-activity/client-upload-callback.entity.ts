import { EntityParent } from '@pardjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientUploadCallback extends EntityParent {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  requestId: number;

  @Column()
  filename: string;

  @Column()
  size: string;

  @Column()
  mimeType: string;
}
