import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostDetailDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  writer: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
