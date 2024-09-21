import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PostDto } from './dto/post.dto';
import { PaginationUtils } from '../utils/pagination.utils';
import { plainToInstance } from 'class-transformer';
import { PostDetailDto } from './dto/post-detail.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PasswordValidatorService } from './password-validator.service';
import { CommentDto } from './dto/comment.dto';
import { ReplyDto } from './dto/reply.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostCreateEvent } from '../alarm/events/post.create.event';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordValidatorService: PasswordValidatorService,
    private eventEmitter: EventEmitter2,
  ) {}

  async delete(id: number, password: string): Promise<PostDetailDto> {
    await this.passwordValidatorService.validatePostPassword(id, password);
    const post = await this.prismaService.post.findFirst({
      where: {
        id,
      },
    });

    await this.prismaService.post.delete({
      where: { id },
    });

    return plainToInstance(PostDetailDto, post);
  }

  async update(input: UpdatePostDto): Promise<PostDetailDto> {
    await this.passwordValidatorService.validatePostPassword(
      input.id,
      input.password,
    );

    const post = await this.prismaService.post.update({
      where: {
        id: input.id,
      },
      data: {
        content: input.content,
        title: input.title,
      },
    });

    return plainToInstance(PostDetailDto, post);
  }

  async create(input: CreatePostDto): Promise<PostDetailDto> {
    const post = await this.prismaService.post.create({
      data: input,
    });

    /* 게시글 생성 시 알림을 보내는 이벤트 추가 */
    await this.eventEmitter.emitAsync(
      'post.created',
      new PostCreateEvent(post.id, post),
    );

    return plainToInstance(PostDetailDto, post);
  }

  async findPost(id: number): Promise<PostDetailDto> {
    const post = await this.prismaService.post.findFirst({
      where: {
        id,
      },
    });

    return plainToInstance(PostDetailDto, post);
  }

  async findRepliesByPost(
    postId: number,
    { cursor, take },
  ): Promise<CommentDto[]> {
    console.log(postId, cursor, take);
    const comments = await this.prismaService.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      include: {
        Replies: true,
      },
      ...PaginationUtils.generate(cursor, take),
    });

    return plainToInstance(
      CommentDto,
      comments.map(
        (comment) =>
          ({
            ...comment,
            replies: comment.Replies.map(
              (reply) => ({ ...reply }) satisfies ReplyDto,
            ),
          }) satisfies CommentDto,
      ),
    );
  }

  async findPosts(
    cursor: number | undefined,
    take: number,
    keyword?: string,
  ): Promise<[number, PostDto[]]> {
    const totalCount = await this.prismaService.post.count({
      ...(keyword && {
        where: {
          title: {
            search: keyword,
          },
          content: {
            search: keyword,
          },
          writer: {
            search: keyword,
          },
        },
      }),
    });

    const result = await this.prismaService.post.findMany({
      ...(keyword && {
        where: {
          title: {
            search: keyword,
          },
          content: {
            search: keyword,
          },
          writer: {
            search: keyword,
          },
        },
      }),
      select: {
        id: true,
        title: true,
        content: true,
        _count: {
          select: {
            Comment: {
              where: {
                parentId: null,
              },
            },
          },
        },
      },
      ...PaginationUtils.generate(cursor, take),
    });

    return [
      totalCount,
      plainToInstance(
        PostDto,
        result.map(
          (post) =>
            ({
              ...post,
              repliesCount: post._count.Comment,
            }) satisfies PostDto,
        ),
      ),
    ];
  }
}
