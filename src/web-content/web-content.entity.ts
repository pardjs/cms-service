import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityParent as TimeEntity } from '@pardjs/common';

@Entity('WebContent')
export class WebContent extends TimeEntity {
  @PrimaryColumn('varchar')
  name: string;

  @Column({ type: 'jsonb' })
  content: object;
}
