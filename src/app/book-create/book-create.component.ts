import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  book:Book;
  bookForm:FormGroup;

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title:[this.book?.title, Validators.compose([
        Validators.required
      ])],
      author:[this.book?.title, Validators.compose([
        Validators.required
      ])],
      isbn:[this.book?.isbn, Validators.compose([
        Validators.required
      ])],
      publisher:[this.book?.publisher, Validators.compose([
        Validators.required
      ])],
      review:[this.book?.review, Validators.compose([
        Validators.required
      ])],
      images:[this.book?.images, Validators.compose([
        Validators.required
      ])],
    })
  }

  get title() {
    return this.bookForm.get('title');
  }
  get isbn() {
    return this.bookForm.get('isbn');
  }
  get publisher() {
    return this.bookForm.get('publisher');
  }
  get author() {
    return this.bookForm.get('author');
  }
  get review() {
    return this.bookForm.get('review');
  }
  get images() {
    return this.bookForm.get('images');
  }
}
