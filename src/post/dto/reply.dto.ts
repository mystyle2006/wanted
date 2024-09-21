import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReplyDto {
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
}
