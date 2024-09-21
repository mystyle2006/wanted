import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PostModule } from './post/post.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/filter/http-exception.filter';
import { CommentModule } from './comment/comment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AlarmModule } from './alarm/alarm.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    PostModule,
    CommentModule,
    AlarmModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
