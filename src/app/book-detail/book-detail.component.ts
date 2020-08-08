import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../_service/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../_models/book';
import { BookDetail } from '../_models/book-detail';
import { TokenStorageService } from '../_service/token-storage.service';
import { Rating } from '../_models/rating';
import { Comment } from '../_models/comment';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  constructor(
    private bookService:BookService,
    private route : ActivatedRoute,
    private tokenStorageService: TokenStorageService) { }
  book:BookDetail;
  error:any;
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.bookService.getOne(id).subscribe(
      res => {
        this.book = res;
        // set display properties
        this.setDisplayProperties(this.book);
      },
      error => {
        this.error = error;
      }
    )
  }
  setDisplayProperties(book: BookDetail) {
    book.canModifyBook = this.canModifyBook(book);
    book.comments.forEach(comment => {
      comment.canModifyComment = this.canModifyComment(comment);
    });
    book.ratings.forEach(rating => {
      rating.canModifyRating = this.canModifyRating(rating);
    })
  }

  canModifyComment(comment:Comment):boolean {
    let user = this.tokenStorageService.getUser();
    let isBanned = user.banned;
    let isAdmin = user.role === 1;
    let isCommentCreator = comment.created_by === user.name;
    return isAdmin || (!isBanned && isCommentCreator);
  }

  canModifyRating(rating:Rating):boolean {
    let user = this.tokenStorageService.getUser();
    let isBanned = user.banned;
    let isAdmin = user.role === 1;
    let isRatingCreator = rating.created_by === user.name;
    return isAdmin || (!isBanned && isRatingCreator);
  }

  canModifyBook(book:Book) :boolean{
    return true;
  }

  deleteBook(id:number):any {

  }
  addComment(comment:Comment):any {

  }
  editComment(id:number, comment:Comment):any {

  }
  deleteComment(id:number):any {

  }
  showEditCommentForm(id:number, comment:Comment):any {

  }
}
