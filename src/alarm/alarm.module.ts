import { Module } from '@nestjs/common';
import { PostCreateListener } from './post.create.listener';
import { CommentCreateListener } from './comment.create.listener';
import { PrismaService } from '../prisma.service';
import { AlarmService } from './alarm.service';
@Module({
  providers: [
    PrismaService,
    PostCreateListener,
    CommentCreateListener,
    AlarmService,
  ],
})
export class AlarmModule {}
