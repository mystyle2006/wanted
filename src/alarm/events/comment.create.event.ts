import { Comment } from '@prisma/client';

export class CommentCreateEvent {
  public postId: number;
  public data: Comment;

  constructor(postId: number, data: Comment) {
    this.postId = postId;
    this.data = data;
  }
}
