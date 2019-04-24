import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WebContent, WebContentController, WebContentService } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([WebContent])],
  controllers: [WebContentController],
  providers: [WebContentService],
})
export class WebContentModule {}
