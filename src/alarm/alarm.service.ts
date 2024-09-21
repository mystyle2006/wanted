import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AlarmService {
  private readonly logger = new Logger(AlarmService.name);
  constructor(private readonly prismaService: PrismaService) {}
  async sendAlarmByKeyword(keyword: string): Promise<void> {
    const users = await this.prismaService.alarm.findMany({
      where: {
        keyword: {
          in: keyword.split(' '),
        },
      },
    });

    // 알림 전송
    if (users.length) {
      this.logger.log(
        `>>>> 알림 전송 완료: ${users.map((user) => user.writer).join(', ')}`,
      );
    }
  }
}
