import { Book } from './book';
import { CommentDetail } from './comment-detail';
import { RatingDetail } from './rating-detail';
export class BookDetail extends Book {
  canModifyBook:boolean;
  myRating:number;
  comments:CommentDetail[];
  ratings:RatingDetail[];
}
