import { PaginationDto } from './dto/pagination.dto';

export class PaginationUtils {
  static generate(
    cursor: number | undefined,
    take: number,
  ): {
    take: number;
    skip: number;
    cursor: { id: number } | undefined;
  } {
    return {
      take: take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    };
  }

  static response<T extends { id: number }[]>({
    total,
    take,
    data,
  }: {
    total: number;
    take: number;
    data: T;
  }): PaginationDto<T> {
    const nextCursor = data.length > 0 ? data[data.length - 1].id : null;

    return {
      items: data,
      pagination: {
        total,
        next: nextCursor,
        hasNext: data.length === take,
      },
    };
  }
}
