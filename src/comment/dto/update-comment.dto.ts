import { IsNumber, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(500)
  content: string;

  @IsString()
  @Matches(/^[A-Za-z0-9!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|~`]{1,16}$/, {
    message:
      '비밀번호는 영문+숫자+특수기호 16자 이하의 문자열로 구성되어야합니다.',
  })
  password: string;
}
