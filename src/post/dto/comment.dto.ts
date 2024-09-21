import { Exclude, Expose, Type } from 'class-transformer';
import { ReplyDto } from './reply.dto';

@Exclude()
export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  writer: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ReplyDto)
  replies: ReplyDto[];
}
