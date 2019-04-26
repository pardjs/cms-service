import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityParent as TimeEntity } from '@pardjs/common';

@Entity('WebContent')
export class WebContent extends TimeEntity {
  @PrimaryColumn('varchar')
  key: string;

  @Column({ type: 'jsonb' })
  value: object;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'varchar', default: '' })
  publishedUrl: string;

  @Column({ type: 'boolean', default: false })
  updatedSinceLastPublish: boolean;
}
