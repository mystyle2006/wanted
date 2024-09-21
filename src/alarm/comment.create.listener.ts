import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommentCreateEvent } from './events/comment.create.event';
import { AlarmService } from './alarm.service';

@Injectable()
export class CommentCreateListener {
  private readonly logger = new Logger(CommentCreateListener.name);
  constructor(private readonly alarmService: AlarmService) {}

  @OnEvent('comment.created', { async: true })
  async commentCreateHandler(payload: CommentCreateEvent) {
    this.logger.log(`>>>> 댓글 번호: ${payload.postId} 생성 후 알림 전송`);
    await this.alarmService.sendAlarmByKeyword(payload.data.content);
  }
}
