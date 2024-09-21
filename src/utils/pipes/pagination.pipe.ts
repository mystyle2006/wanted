import { PipeTransform, Injectable } from '@nestjs/common';

export const DEFAULT_TAKE = 10;

@Injectable()
export class CursorPipe implements PipeTransform<string, number> {
  transform(cursor: string): number | undefined {
    const cursorNumber = cursor ? parseInt(cursor) : undefined;
    return cursorNumber ? cursorNumber : undefined;
  }
}

@Injectable()
export class TakePipe implements PipeTransform<string, number> {
  transform(take: string): number | undefined {
    return take ? parseInt(take) : DEFAULT_TAKE;
  }
}
