import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PostCreateEvent } from './events/post.create.event';
import { AlarmService } from './alarm.service';

@Injectable()
export class PostCreateListener {
  private readonly logger = new Logger(PostCreateListener.name);

  constructor(private readonly alarmService: AlarmService) {}

  @OnEvent('post.created', { async: true })
  async postCreateHandler(payload: PostCreateEvent) {
    this.logger.log(`>>>> 게시글 번호: ${payload.postId} 생성 후 알림 전송`);
    await this.alarmService.sendAlarmByKeyword(
      [payload.data.content, payload.data.title].join(' '),
    );
  }
}
