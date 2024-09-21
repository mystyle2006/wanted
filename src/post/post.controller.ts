import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CursorPipe, TakePipe } from '../utils/pipes/pagination.pipe';
import { PostDto } from './dto/post.dto';
import { ResponseUtil } from '../utils/response.util';
import { ResponseDto } from '../utils/dto/response.dto';
import { PostService } from './post.service';
import { PaginationUtils } from '../utils/pagination.utils';
import { PaginationDto } from '../utils/dto/pagination.dto';
import { PostDetailDto } from './dto/post-detail.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommentDto } from './dto/comment.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /* 게시판에 작성된 게시글들을 전부 확인할 수 있는 API */
  @Get()
  async posts(
    @Query('cursor', new CursorPipe()) cursor: number,
    @Query('take', new TakePipe()) take: number,
    @Query('keyword') keyword: string,
  ): Promise<ResponseDto<PaginationDto<PostDto[]>>> {
    const [total, data] = await this.postService.findPosts(
      cursor,
      take,
      keyword,
    );

    return ResponseUtil.success(
      '성공적으로 게시글 목록을 응답합니다.',
      PaginationUtils.response({
        total,
        data,
        take,
      }),
    );
  }

  @Get(':id')
  async post(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ResponseDto<PostDetailDto>> {
    const item = await this.postService.findPost(id);
    return ResponseUtil.success(
      '성공적으로 게시글 상세 내용을 응답합니다.',
      item,
    );
  }

  @Get(':id/comments')
  async replies(
    @Param('id', new ParseIntPipe()) id: number,
    @Query('cursor', new CursorPipe()) cursor: number,
    @Query('take', new TakePipe()) take: number,
  ): Promise<ResponseDto<CommentDto[]>> {
    const item = await this.postService.findRepliesByPost(id, { cursor, take });
    return ResponseUtil.success(
      '성공적으로 게시글 상세 내용을 응답합니다.',
      item,
    );
  }

  @Post()
  async createPost(
    @Body() input: CreatePostDto,
  ): Promise<ResponseDto<PostDetailDto>> {
    const post = await this.postService.create(input);
    return ResponseUtil.success('성공적으로 게시글이 생성되었습니다.', post);
  }

  @Put()
  async updatePost(
    @Body() input: UpdatePostDto,
  ): Promise<ResponseDto<PostDetailDto>> {
    const post = await this.postService.update(input);
    return ResponseUtil.success('성공적으로 게시글이 수정되었습니다.', post);
  }

  @Delete(':id')
  async deletePost(
    @Body() input: Pick<UpdatePostDto, 'password'>,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ResponseDto<PostDetailDto>> {
    const post = await this.postService.delete(id, input.password);
    return ResponseUtil.success('성공적으로 게시글이 삭제되었습니다.', post);
  }
}
