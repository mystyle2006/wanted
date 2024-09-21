export class PaginationDto<T> {
  items: T;
  pagination: {
    total: number;
    next: number;
    hasNext: boolean;
  };
}
