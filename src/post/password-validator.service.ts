import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PasswordValidatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateCommentPassword(
    id: number,
    inputPassword: string,
  ): Promise<void> {
    const comment = await this.prismaService.comment.findFirst({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    if (!comment) {
      throw new Error('댓글이 존재하지 않습니다.');
    }

    this.validate(inputPassword, comment.password);
  }

  async validatePostPassword(id: number, inputPassword: string): Promise<void> {
    const post = await this.prismaService.post.findFirst({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    if (!post) {
      throw new Error('게시글이 존재하지 않습니다.');
    }

    this.validate(inputPassword, post.password);
  }

  private validate(inputPassword: string, targetPassword: string) {
    if (inputPassword !== targetPassword) {
      throw new UnauthorizedException(
        '비밀번호가 일치하지 않아 수정 또는 삭제가 불가능합니다.',
      );
    }
  }
}
