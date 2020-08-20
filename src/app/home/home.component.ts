import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { Book } from '../_models/book';
import { Rating } from '../_models/rating';
import { BookService } from '../_service/book.service';
import { Constants } from '../constants/constants.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Book[];
  errorMessage:string;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(
      res => {
        this.books = res.data;
        this.books.forEach(book => {
          book.averageRating = this.getAverageBookRating(book.ratings)
        });
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }

  getAverageBookRating(ratings:Rating[]) : number{
    const intitalValue = 0;
    return ratings.reduce((a, b) => (a + b.value), intitalValue) / ratings.length;
  }
  createRange(start, end){
    var items: number[] = [];
    for(var i = start; i < end; i++){
       items.push(i);
    }
    return items;
  }
}
