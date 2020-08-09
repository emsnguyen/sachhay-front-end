import { Component, OnInit } from '@angular/core';
import { BookService } from '../_service/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../_models/book';
import { BookDetail } from '../_models/book-detail';
import { TokenStorageService } from '../_service/token-storage.service';
import { Rating } from '../_models/rating';
import { Comment } from '../_models/comment';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditRatingDialogComponent } from '../edit-rating-dialog/edit-rating-dialog.component';
import { RatingService } from '../_service/rating.service';
import { CommentService } from '../_service/comment.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book:BookDetail;
  error:any;
  rating = 0;
  ratingId:number;

  constructor(
    private bookService:BookService,
    private route : ActivatedRoute,
    private dialog:MatDialog,
    private tokenStorageService: TokenStorageService,
    private ratingService: RatingService,
    private commentService: CommentService
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.bookService.getOne(id).subscribe(
      res => {
        this.book = res.data;
        // set display properties
        this.setDisplayProperties(this.book);
        this.book.averageRating = this.getAverageBookRating(this.book.ratings);
        const myRating = this.getMyRating(this.book.ratings);
        if (myRating) {
          this.rating = myRating.value;
          this.ratingId = myRating.id;
        }

      },
      error => {
        this.error = error;
      }
    )
  }
  getMyRating(ratings:Rating[]):Rating {
    const currentUserRatings = ratings.filter(rating => rating.created_by == this.tokenStorageService.getUser().username);
    if (currentUserRatings) return currentUserRatings[0];
    return null;
  }
  getAverageBookRating(ratings:Rating[]) : number{
    const intitalValue = 0;
    return ratings.reduce((a, b) => (a + b.value), intitalValue) / ratings.length;
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

  updateBook(id:number):any {

  }

  deleteBook(id:number):any {

  }
  addComment(comment:Comment):any {

  }
  updateComment(id:number, comment:Comment):any {

  }
  deleteComment(id:number):any {

  }

  addRating():void {
    const dialogRef = this.openRatingDialog();
    dialogRef.beforeClosed().subscribe(result => {
      this.rating = result;
      // Add rating vào database
      const ratingObj = new Rating();
      ratingObj.book_id = this.book.id;
      ratingObj.value = this.rating;
      this.ratingService.create(ratingObj).subscribe(
        res => {
          this.ratingId = res.id;
          alert("Rating added");
        },
        err => {
          console.log(err);
        }
      )
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  updateRating():void {
    const dialogRef = this.openRatingDialog();
    dialogRef.afterClosed().subscribe(result => {
      this.rating = result;
      // Update rating vào database
      const ratingObj = new Rating();
      ratingObj.value = this.rating;
      this.ratingService.update(this.ratingId, ratingObj).subscribe(
        res => {
          alert("Rating updated");
        },
        err => {
          console.log(err);
        }
      )
    });
  }
  deleteRating() {
    this.ratingService.delete(this.ratingId).subscribe(
      res => {
        alert("Rating deleted");
        this.rating = 0;
      },
      err => {
        console.log(err);
      }
    )
  }
  openRatingDialog():MatDialogRef<EditRatingDialogComponent> {
    return this.dialog.open(EditRatingDialogComponent, {
      disableClose:true,
      autoFocus:true,
      data: {
        rating:this.rating
      }
    } );
  }
  createRange(start, end){
    var items: number[] = [];
    for(var i = start; i < end; i++){
       items.push(i);
    }
    return items;
  }
}
