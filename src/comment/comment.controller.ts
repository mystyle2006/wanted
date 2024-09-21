import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseDto } from '../utils/dto/response.dto';
import { ResponseUtil } from '../utils/response.util';
import { CommentService } from './comment.service';
import { CommentDto } from '../post/dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('')
  async createComment(
    @Body() input: CreateCommentDto,
  ): Promise<ResponseDto<CommentDto>> {
    const comment = await this.commentService.create(input);
    return ResponseUtil.success('성공적으로 댓글이 생성되었습니다.', comment);
  }

  @Put()
  async updateComment(
    @Body() input: UpdateCommentDto,
  ): Promise<ResponseDto<CommentDto>> {
    const comment = await this.commentService.update(input);
    return ResponseUtil.success('성공적으로 댓글이 수정되었습니다.', comment);
  }

  @Delete(':id')
  async deleteComment(
    @Body() input: Pick<UpdateCommentDto, 'password'>,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ResponseDto<CommentDto>> {
    const post = await this.commentService.delete(id, input.password);
    return ResponseUtil.success('성공적으로 댓글이 삭제되었습니다.', post);
  }
}
