import { Rating } from './rating';
import { Comment } from './comment';
import { Image } from './image';
export class Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  review:string;
  images:Image[];
  comments:Comment[];
  ratings:Rating[];
  publisher:string;
  created_by:string;
  updated_by:string;
  created_at:Date;
  deleted_at:Date;
  updated_at:Date;
  averageRating:number;
}
