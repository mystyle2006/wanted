import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from '../post/dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PasswordValidatorService } from '../post/password-validator.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommentCreateEvent } from '../alarm/events/comment.create.event';

@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordValidatorService: PasswordValidatorService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create({
    postId,
    parentId,
    ...leftover
  }: CreateCommentDto): Promise<CommentDto> {
    const comment = await this.prismaService.comment.create({
      data: {
        ...leftover,
        ...(parentId && {
          Parent: {
            connect: {
              id: parentId,
            },
          },
        }),
        Post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    /* 댓글 생성 시 알림을 보내는 이벤트 추가 */
    await this.eventEmitter.emitAsync(
      'comment.created',
      new CommentCreateEvent(comment.id, comment),
    );

    return plainToInstance(CommentDto, comment);
  }

  async delete(id: number, password: string): Promise<CommentDto> {
    await this.passwordValidatorService.validateCommentPassword(id, password);
    const comment = await this.prismaService.comment.findFirst({
      where: {
        id,
      },
    });

    await this.prismaService.comment.delete({
      where: { id },
    });

    return plainToInstance(CommentDto, comment);
  }

  async update(input: UpdateCommentDto): Promise<CommentDto> {
    await this.passwordValidatorService.validateCommentPassword(
      input.id,
      input.password,
    );
    const comment = await this.prismaService.comment.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });

    return plainToInstance(CommentDto, comment);
  }
}
