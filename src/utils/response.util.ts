import { ResponseDto } from './dto/response.dto';

export class ResponseUtil {
  static success<T>(message: string, data?: T): ResponseDto<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string): ResponseDto<null> {
    return {
      success: false,
      message,
    };
  }
}
