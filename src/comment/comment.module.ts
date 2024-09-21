import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../prisma.service';
import { PasswordValidatorService } from '../post/password-validator.service';

@Module({
  providers: [CommentService, PrismaService, PasswordValidatorService],
  controllers: [CommentController],
})
export class CommentModule {}
