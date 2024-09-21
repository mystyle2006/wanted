import { Test } from '@nestjs/testing';
import { PasswordValidatorService } from '../../src/post/password-validator.service';
import { PrismaService } from '../../src/prisma.service';
import { mockPrismaService } from '../prisma.mock';

describe('PasswordValidatorService', () => {
  let service: PasswordValidatorService;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PasswordValidatorService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = moduleRef.get(PasswordValidatorService);
    prismaService = moduleRef.get<typeof mockPrismaService>(PrismaService);
  });

  describe('validatePostPassword', () => {
    it('게시글 비밀번호 검증에 실패했을 경우', async () => {
      // given
      const invalidInputPassword = 'invalid-test';
      const id = 1;
      prismaService.post.findFirst.mockResolvedValue({
        password: 'test',
      });

      // when
      // then
      await expect(async () => {
        await service.validatePostPassword(id, invalidInputPassword);
      }).rejects.toThrowError(
        '비밀번호가 일치하지 않아 수정 또는 삭제가 불가능합니다.',
      );
    });
  });

  describe('validateCommentPassword', () => {
    it('게시글 비밀번호 검증에 실패했을 경우', async () => {
      // given
      const invalidInputPassword = 'invalid-test';
      const id = 1;
      prismaService.comment.findFirst.mockResolvedValue({
        password: 'test',
      });

      // when
      // then
      await expect(async () => {
        await service.validateCommentPassword(id, invalidInputPassword);
      }).rejects.toThrowError(
        '비밀번호가 일치하지 않아 수정 또는 삭제가 불가능합니다.',
      );
    });
  });
});
