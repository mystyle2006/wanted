// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 1000; i += 1) {
    const item = await prisma.post.create({
      data: {
        title: faker.internet.displayName(),
        content: faker.commerce.productDescription(),
        writer: faker.internet.userName(),
        password: faker.internet.password({ length: 16 }),
        Comment: {
          createMany: {
            data: [
              {
                content: faker.commerce.productDescription(),
                writer: faker.internet.userName(),
                password: faker.internet.password({ length: 16 }),
              },
              {
                content: faker.commerce.productDescription(),
                writer: faker.internet.userName(),
                password: faker.internet.password({ length: 16 }),
              },
            ],
          },
        },
      },
      select: {
        Comment: true,
      },
    });

    await prisma.comment.update({
      where: {
        id: item.Comment[0].id,
      },
      data: {
        Replies: {
          createMany: {
            data: [
              {
                postId: item.Comment[0].postId,
                content: faker.commerce.productDescription(),
                writer: faker.internet.userName(),
                password: faker.internet.password({ length: 16 }),
              },
              {
                postId: item.Comment[0].postId,
                content: faker.commerce.productDescription(),
                writer: faker.internet.userName(),
                password: faker.internet.password({ length: 16 }),
              },
            ],
          },
        },
      },
    });
  }

  await prisma.alarm.create({
    data: {
      writer: 'wanted',
      keyword: 'wanted',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('>>> 시드 생성 완료');
    await prisma.$disconnect();
  });
