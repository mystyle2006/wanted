import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../prisma.service';
import { PasswordValidatorService } from './password-validator.service';

@Module({
  controllers: [PostController],
  providers: [PrismaService, PostService, PasswordValidatorService],
})
export class PostModule {}
