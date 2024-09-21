import { Post } from '@prisma/client';

export class PostCreateEvent {
  public postId: number;
  public data: Post;

  constructor(postId: number, data: Post) {
    this.postId = postId;
    this.data = data;
  }
}
