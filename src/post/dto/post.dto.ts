import { Exclude, Expose, Transform } from 'class-transformer';

const MAX_CONTENT_LENGTH = 50;

@Exclude()
export class PostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  @Transform(
    ({ value }) =>
      `${value.substring(0, MAX_CONTENT_LENGTH)}${value.length > MAX_CONTENT_LENGTH ? '...' : ''}`,
  ) // 앞 100자만 가져옴
  content: string;

  @Expose()
  repliesCount: number;
}
